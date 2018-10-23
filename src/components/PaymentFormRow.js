// @flow

import type {Node} from 'react';

import React, {Component} from 'react';
import '../css/PaymentFormRow.css';

type Props = {
  component: Node,
  masterClass?: string,
  title?: string,
};

class PaymentFormRow extends Component<Props> {
  render() {
    const {component, masterClass, title} = this.props;
    return (
      <div className={masterClass}>
        {title && <div>{title}</div>}
        <div className="formRowComponent">{component}</div>
      </div>
    );
  }
}

export default PaymentFormRow;
