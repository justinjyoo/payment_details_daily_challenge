// @flow

import PaymentFormRow from './PaymentFormRow';
import PaymentFormTextInput from './PaymentFormTextInput';
import React, {Component} from 'react';
import '../css/App.css';

const defaultFieldPlaceholders = require('../enums/defaultFieldPlaceholders');
const logos = require('../images/credit-card-logos.jpg');
const {
  formatCardNumber,
  formatMonth,
  formatYear,
} = require('../utils/FormatPaymentInputUtils');
const paymentValidationUtils = require('../utils/PaymentFormValidationUtils');

type State = {
  cardNumber: string,
  cvv2: string,
  expMonth: string,
  expYear: string,
  isErrorCardNumber: boolean,
  isErrorCvv2: boolean,
  isErrorName: boolean,
  isErrorExpMonth: boolean,
  isErrorExpYear: boolean,
  name: string,
};

const TodayDate = new Date();
const currentMonth = TodayDate.getMonth() + 1;
const currentYear = TodayDate.getFullYear();

class App extends Component<{}, State> {
  state = {
    cardNumber: '',
    cvv2: '',
    expMonth: '',
    expYear: '',
    isErrorCardNumber: false,
    isErrorCvv2: false,
    isErrorName: false,
    isErrorExpMonth: false,
    isErrorExpYear: false,
    name: '',
  };

  _onChange = (fieldName: string, fieldValue: string) => {
    let isValidFieldValue = false;
    if (
      fieldName !== 'name' &&
      fieldValue !== defaultFieldPlaceholders[fieldName]
    ) {
      // remove white space and non-digits before validation for all fields
      // except the name field
      fieldValue = fieldValue.replace(/\D/g, '');
    }

    isValidFieldValue = !this._validateField(fieldName, fieldValue);
    switch (fieldName) {
      case 'cardNumber':
        const isCVVValid = !this._validateField('cvv2', this.state.cvv2);
        this._setValidationErrors('cvv2', isCVVValid);
        this._setValidationErrors(fieldName, isValidFieldValue);
        fieldValue = formatCardNumber(fieldValue);
        break;
      case 'expMonth':
        this._setValidationErrors('expMonth', isValidFieldValue);
        this._setValidationErrors('expYear', isValidFieldValue);
        fieldValue = formatMonth(fieldValue);
        break;
      case 'expYear':
        this._setValidationErrors('expMonth', isValidFieldValue);
        this._setValidationErrors('expYear', isValidFieldValue);
        fieldValue = formatYear(fieldValue);
        break;
      default:
        this._setValidationErrors(fieldName, isValidFieldValue);
        break;
    }
    this.setState({[fieldName]: fieldValue});
  };

  _onSubmit = () => {
    let presubmitErrors = false;
    let requests = Object.keys(defaultFieldPlaceholders).map(async fieldKey => {
      const isError = !this._validateField(fieldKey, this.state[fieldKey]);
      return new Promise(resolve => {
        presubmitErrors = presubmitErrors || isError;
        resolve(this._setValidationErrors(fieldKey, isError));
      });
    });
    Promise.all(requests).then(() => {
      if (!presubmitErrors) {
        alert('Payment details successfully sent!');
        // not doing anything with the payment details, clear form
        this.setState({
          cardNumber: '',
          cvv2: '',
          expMonth: '',
          expYear: '',
          name: '',
        });
      }
    });
  };

  _setValidationErrors = (fieldName: string, isError: boolean) => {
    const capitalizedFieldName =
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    this.setState({[`isError${capitalizedFieldName}`]: isError});
  };

  _validateField = (fieldKey: string, fieldValue: string) => {
    let isInputValid = true;
    const capitalizedFieldName =
      fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1);
    switch (fieldKey) {
      case 'cvv2':
        isInputValid = paymentValidationUtils.validateCvv2Number(
          fieldValue,
          this.state.cardNumber,
        );
        break;
      case 'expMonth':
        isInputValid = paymentValidationUtils.validateDate(
          fieldValue,
          currentMonth,
          this.state.expYear,
          currentYear,
        );
        break;
      case 'expYear':
        isInputValid = paymentValidationUtils.validateDate(
          this.state.expMonth,
          currentMonth,
          fieldValue,
          currentYear,
        );
        break;
      default:
        if (
          paymentValidationUtils[`validate${capitalizedFieldName}`] !==
          undefined
        ) {
          isInputValid = paymentValidationUtils[
            `validate${capitalizedFieldName}`
          ](fieldValue);
        }
        break;
    }
    return isInputValid;
  };

  render() {
    const {
      cardNumber,
      cvv2,
      expMonth,
      expYear,
      isErrorCardNumber,
      isErrorCvv2,
      isErrorExpMonth,
      isErrorExpYear,
      isErrorName,
      name,
    } = this.state;
    return (
      <div className="app">
        <form className="paymentDetailsContainer">
          <div className="title">Enter your credit card information</div>
          <PaymentFormRow
            component={
              <>
                <PaymentFormTextInput
                  fieldName="name"
                  inputError={isErrorName}
                  onChange={this._onChange}
                  placeholder={defaultFieldPlaceholders.name}
                  value={name}
                />
                {isErrorName ? (
                  <b class="presubmitErrorMessage">Please enter your name</b>
                ) : null}
              </>
            }
          />
          <PaymentFormRow
            component={
              <>
                <PaymentFormTextInput
                  fieldName="cardNumber"
                  inputError={isErrorCardNumber}
                  onChange={this._onChange}
                  placeholder={defaultFieldPlaceholders.cardNumber}
                  value={cardNumber}
                />
                {isErrorCardNumber ? (
                  <b class="presubmitErrorMessage">
                    Please enter a valid card number
                  </b>
                ) : null}
              </>
            }
          />
          <PaymentFormRow
            component={
              <>
                <PaymentFormTextInput
                  fieldName="cvv2"
                  inputError={isErrorCvv2}
                  onChange={this._onChange}
                  placeholder={defaultFieldPlaceholders.cvv2}
                  value={cvv2}
                />
                {isErrorCvv2 ? (
                  <b class="presubmitErrorMessage">
                    Please enter a valid cvv number
                  </b>
                ) : null}
              </>
            }
          />
          <PaymentFormRow
            component={
              <>
                <PaymentFormTextInput
                  className="paymentFormSmallerTextInput"
                  fieldName="expMonth"
                  inputError={isErrorExpMonth}
                  onChange={this._onChange}
                  placeholder={defaultFieldPlaceholders.expMonth}
                  value={expMonth}
                />
                <PaymentFormTextInput
                  className="paymentFormSmallerTextInput"
                  fieldName="expYear"
                  inputError={isErrorExpYear}
                  onChange={this._onChange}
                  placeholder={defaultFieldPlaceholders.expYear}
                  value={expYear}
                />
                {isErrorExpMonth || isErrorExpYear ? (
                  <b class="presubmitErrorMessage">
                    Please enter a valid expiration date
                  </b>
                ) : null}
              </>
            }
          />
          <img className="logos" src={logos} />
          <input
            type="button"
            className="button"
            onClick={this._onSubmit}
            value={'Submit'}
          />
        </form>
      </div>
    );
  }
}

export default App;
