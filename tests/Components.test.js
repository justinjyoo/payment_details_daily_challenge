import { mount, shallow, render } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import PaymentForm from '../src/components/PaymentForm';
import PaymentFormRow from '../src/components/PaymentFormRow';
import PaymentFormTextInput from '../src/components/PaymentFormTextInput';

const form = mount(<PaymentForm />);

describe('PaymentForm', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PaymentForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('sets correct default state', () => {
    expect(form.state().cardNumber).toEqual('');
    expect(form.state().cvv2).toEqual('');
    expect(form.state().expMonth).toEqual('');
    expect(form.state().expYear).toEqual('');
    expect(form.state().isErrorCardNumber).toEqual(false);
    expect(form.state().isErrorCvv2).toEqual(false);
    expect(form.state().isErrorName).toEqual(false);
    expect(form.state().isErrorExpMonth).toEqual(false);
    expect(form.state().isErrorExpYear).toEqual(false);
    expect(form.state().name).toEqual('');
  })

  it('sets a formatted cardNumber if valid', () => {
    form.instance()._onChange('cardNumber', '4147123412341234');
    expect(form.state().cardNumber).toEqual('4147 1234 1234 1234');
    form.instance()._onChange('cardNumber', '341234567891234');
    expect(form.state().cardNumber).toEqual('3412 345678 91234');
  })

  it('sets a formatted month if valid', () => {
    form.instance()._onChange('expMonth', '1');
    expect(form.state().expMonth).toEqual('01');
    form.instance()._onChange('expMonth', '5');
    expect(form.state().expMonth).toEqual('05');
  })

  it('sets correct error states for invalid values', () => {
    form.instance()._onChange('cardNumber', '456');
    form.instance()._onChange('cvv2', '1');
    form.instance()._onChange('expMonth', 'fds');
    form.instance()._onChange('expYear', '2016');
    form.instance()._onChange('name', '');
    expect(form.state().isErrorCardNumber).toEqual(true);
    expect(form.state().isErrorCvv2).toEqual(true);
    expect(form.state().isErrorName).toEqual(true);
    expect(form.state().isErrorExpMonth).toEqual(true);
    expect(form.state().isErrorExpYear).toEqual(true);
  })
})

describe('PaymentFormTextInput', () => {
  const component = shallow(<PaymentFormTextInput />);
  it('has length of 5', () => {
    expect(form.find(PaymentFormTextInput)).toHaveLength(5)
  })

  component.setProps({onChange: () => {}})
  it('onBlur sets value correctly', () => {
    component.find('input').simulate('change', {currentTarget: {value: 'tests'}})
    expect(component.state().value).toEqual('test');
  })

  it('onChange sets value correctly', () => {
    component.find('input').simulate('change', {currentTarget: {value: 'test'}})
    expect(component.state().value).toEqual('test');
  })
})

describe('input fields', () => {
    it('has length of 6', () => {
      expect(form.find('input')).toHaveLength(6)
    })
})

describe('PaymentFormRow', () => {
  it('has length of 5', () => {
    expect(form.find(PaymentFormRow)).toHaveLength(4)
  })
})
