const {
  validateCardNumber,
  validateCvv2Number,
  validateDate,
  validateName,
} = require('../src/utils/PaymentFormValidationUtils');

test('test is good', () => {
  expect(validateCardNumber('4147100412345678')).toEqual(true);
  expect(validateCardNumber('41471004')).toEqual(false);
  expect(validateCardNumber('1234567891012131')).toEqual(false);
  expect(validateCardNumber('')).toEqual(false);
  expect(validateCardNumber('srtdtrdtr')).toEqual(false);
});
