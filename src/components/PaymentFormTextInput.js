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
  value?: string,
}

type State = {
  value: string,
}

class PaymentFormTextInput extends Component<Props, State> {
  static defaultProps = {
    inputError:false,
    placeholder: '',
  }

  state = {
    value: '',
  }

  // onChange for error validation
  _onBlur = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const {fieldName, onChange} = this.props;
    const inputValue = event.currentTarget.value
    onChange(fieldName, inputValue)
    this.setState({value: inputValue});
  }

  _onChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const {fieldName, onChange} = this.props;
    const inputValue = event.currentTarget.value;
    onChange(fieldName, inputValue);
    this.setState({value: inputValue});
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
        value={this.props.value !== null ? this.props.value : this.state.value}
      />
    );
  }
}

export default PaymentFormTextInput;
