// @flow

import React, { Component } from 'react';
import '../css/PaymentFormTextInput.css';

const classNames = require('classnames');

type Props = {
  className?: string,
  fieldName: string,
  inputError: boolean,
  onChange: (fieldName: string, fieldValue: string) => void,
  placeholder: string,
  value: string,
}

class PaymentFormTextInput extends Component<Props> {
  static defaultProps = {
    inputError:false,
    placeholder: '',
  }

  // onChange for error validation
  _onBlur = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const {fieldName, onChange} = this.props;
    const inputValue = event.currentTarget.value
    onChange(fieldName, inputValue)
  }

  _onChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const {fieldName, onChange} = this.props;
    const inputValue = event.currentTarget.value;
    onChange(fieldName, inputValue);
  }

  render() {
    const {className, inputError, placeholder, value} = this.props;
    const classes =
      classNames(
        {'paymentFormTextInputError': inputError},
        'paymentFormTextInput',
        className
      );
    return (
      <input
        className={classes}
        onBlur={this._onBlur}
        onChange={this._onChange}
        placeholder={placeholder}
        value={value}
      />
    );
  }
}

export default PaymentFormTextInput;
