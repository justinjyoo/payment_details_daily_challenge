const {
  validateCardNumber,
  validateCvv2Number,
  validateDate,
  validateName,
} = require('../src/utils/PaymentFormValidationUtils');

test('Validate card number', () => {
  expect(validateCardNumber('4147100412345678')).toEqual(true);
  expect(validateCardNumber('41471004')).toEqual(false);
  expect(validateCardNumber('1234567891012131')).toEqual(false);
  expect(validateCardNumber('')).toEqual(false);
  expect(validateCardNumber('srtdtrdtr')).toEqual(false);
});

test('Validate card number', () => {
  expect(validateCvv2Number('123', '4147100412345678')).toEqual(true);
  expect(validateCvv2Number('1234', '344710041234567')).toEqual(true);
  expect(validateCvv2Number('1234', '344710041234567')).toEqual(true);
});
