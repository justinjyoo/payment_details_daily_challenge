const {
  validateCardNumber,
  validateCvv2Number,
  validateDate,
  validateName,
} = require('../src/utils/PaymentFormValidationUtils');

describe('card numbers that have', () => {
  test('16 digits and start with 4 should validate as true', () => {
    expect(validateCardNumber('4147100412345678')).toEqual(true);
    expect(validateCardNumber('4123456789123456')).toEqual(true);
    expect(validateCardNumber('4987654321987654')).toEqual(true);
    expect(validateCardNumber('4000000000000000')).toEqual(true);
    expect(validateCardNumber('4444444444444444')).toEqual(true);
  });

  test('less than 16 digits and start with 4 should validate as false', () => {
    expect(validateCardNumber('414710041234567?')).toEqual(false);
    expect(validateCardNumber('4')).toEqual(false);
    expect(validateCardNumber('444444444444')).toEqual(false);
    expect(validateCardNumber('4000000000000')).toEqual(false);
    expect(validateCardNumber('41234567891234')).toEqual(false);
  });

  test('more than 16 digits and start with 4 should validate as false', () => {
    expect(validateCardNumber('41471004123456789')).toEqual(false);
    expect(validateCardNumber('412345678912345610')).toEqual(false);
    expect(validateCardNumber('4987654321987654123')).toEqual(false);
    expect(validateCardNumber('40000000000000000000')).toEqual(false);
  });

  test('16 digits and do not start with 4 should validate as false', () => {
    expect(validateCardNumber('1147100412345678')).toEqual(false);
    expect(validateCardNumber('2123456789123456')).toEqual(false);
    expect(validateCardNumber('3987654321987654')).toEqual(false);
    expect(validateCardNumber('5147100412345678')).toEqual(false);
    expect(validateCardNumber('6123456789123456')).toEqual(false);
    expect(validateCardNumber('7987654321987654')).toEqual(false);
    expect(validateCardNumber('8147100412345678')).toEqual(false);
    expect(validateCardNumber('qwertyuiopasdfgh')).toEqual(false);
    expect(validateCardNumber('0000000000000000')).toEqual(false);
  });

  test('15 digits and start with 34 or 37  should validate as true', () => {
    expect(validateCardNumber('341234567891234')).toEqual(true);
    expect(validateCardNumber('349876543219876')).toEqual(true);
    expect(validateCardNumber('340000000000000')).toEqual(true);
    expect(validateCardNumber('343434343434343')).toEqual(true);
    expect(validateCardNumber('371234567891234')).toEqual(true);
    expect(validateCardNumber('379876543219876')).toEqual(true);
    expect(validateCardNumber('370000000000000')).toEqual(true);
    expect(validateCardNumber('373737373737373')).toEqual(true);
  });

  test('less than 15 digits and start with 34 or 37  should validate as false', () => {
    expect(validateCardNumber('34123456789123?')).toEqual(false);
    expect(validateCardNumber('34')).toEqual(false);
    expect(validateCardNumber('34987654321987')).toEqual(false);
    expect(validateCardNumber('3400000000000')).toEqual(false);
    expect(validateCardNumber('343434343434')).toEqual(false);
    expect(validateCardNumber('37123456789123?')).toEqual(false);
    expect(validateCardNumber('37')).toEqual(false);
    expect(validateCardNumber('37987654321987')).toEqual(false);
    expect(validateCardNumber('3700000000000')).toEqual(false);
    expect(validateCardNumber('373737373737')).toEqual(false);
  });

  test('more than 15 digits and start with 34 or 37  should validate as false', () => {
    expect(validateCardNumber('3412345678912345')).toEqual(false);
    expect(validateCardNumber('349876543219876789')).toEqual(false);
    expect(validateCardNumber('34000000000000000000')).toEqual(false);
    expect(validateCardNumber('3712345678912345')).toEqual(false);
    expect(validateCardNumber('379876543219876789')).toEqual(false);
    expect(validateCardNumber('37000000000000000000')).toEqual(false);
  });

  test('15 digits and do not start with 34 or 37  should validate as false', () => {
    expect(validateCardNumber('141234567891234')).toEqual(false);
    expect(validateCardNumber('249876543219876')).toEqual(false);
    expect(validateCardNumber('qwertyuiopasdfg')).toEqual(false);
    expect(validateCardNumber('434343434343434')).toEqual(false);
    expect(validateCardNumber('171234567891234')).toEqual(false);
    expect(validateCardNumber('279876543219876')).toEqual(false);
    expect(validateCardNumber('qwertyuiopasdfg')).toEqual(false);
    expect(validateCardNumber('737373737373737')).toEqual(false);
  });
})

describe('cvv2 numbers that have', () => {
  test('3 digits with a valid Visa card number should return as true', () => {
    expect(validateCvv2Number('123', '4147100412345678')).toEqual(true);
    expect(validateCvv2Number('123', '4123456789123456')).toEqual(true);
    expect(validateCvv2Number('123', '4987654321987654')).toEqual(true);
    expect(validateCvv2Number('123', '4000000000000000')).toEqual(true);
    expect(validateCvv2Number('123', '4444444444444444')).toEqual(true);
  });

  test('less than 3 digits with a valid Visa card number should return as false', () => {
    expect(validateCvv2Number('', '4147100412345678')).toEqual(false);
    expect(validateCvv2Number('1', '4123456789123456')).toEqual(false);
    expect(validateCvv2Number('12', '4987654321987654')).toEqual(false);
  });

  test('more than 3 digits with a valid Visa card number should return as false', () => {
    expect(validateCvv2Number('1234', '4147100412345678')).toEqual(false);
    expect(validateCvv2Number('12345', '4123456789123456')).toEqual(false);
    expect(validateCvv2Number('123456', '4987654321987654')).toEqual(false);
    expect(validateCvv2Number('1234567', '4987654321987654')).toEqual(false);
    expect(validateCvv2Number('12345678', '4987654321987654')).toEqual(false);
    expect(validateCvv2Number('123456789', '4987654321987654')).toEqual(false);
  });

  test('3 digits with an invalid Visa card number should return as false', () => {
    expect(validateCvv2Number('123', '341234567891234')).toEqual(false);
    expect(validateCvv2Number('123', '371234567891234')).toEqual(false);
    expect(validateCvv2Number('123', '498765432198765')).toEqual(false);
    expect(validateCvv2Number('123', 'qwertyuiopasdfgh')).toEqual(false);
    expect(validateCvv2Number('123', '0000000000000000')).toEqual(false);
  });

  test('4 digits with a valid AmEx card number should return as true', () => {
    expect(validateCvv2Number('1234', '341234567891234')).toEqual(true);
    expect(validateCvv2Number('1234', '349876543219876')).toEqual(true);
    expect(validateCvv2Number('1234', '340000000000000')).toEqual(true);
    expect(validateCvv2Number('1234', '343434343434343')).toEqual(true);
    expect(validateCvv2Number('1234', '371234567891234')).toEqual(true);
    expect(validateCvv2Number('1234', '379876543219876')).toEqual(true);
    expect(validateCvv2Number('1234', '370000000000000')).toEqual(true);
    expect(validateCvv2Number('1234', '373737373737373')).toEqual(true);
  });

  test('less than 4 digits with a valid AmEx card number should return as false', () => {
    expect(validateCvv2Number('1', '341234567891234')).toEqual(false);
    expect(validateCvv2Number('12', '349876543219876')).toEqual(false);
    expect(validateCvv2Number('123', '340000000000000')).toEqual(false);
    expect(validateCvv2Number('1', '371234567891234')).toEqual(false);
    expect(validateCvv2Number('12', '379876543219876')).toEqual(false);
    expect(validateCvv2Number('123', '370000000000000')).toEqual(false);
  });

  test('more than 4 digits with a valid AmEx card number should return as false', () => {
    expect(validateCvv2Number('12345', '341234567891234')).toEqual(false);
    expect(validateCvv2Number('123456', '349876543219876')).toEqual(false);
    expect(validateCvv2Number('1234567', '340000000000000')).toEqual(false);
    expect(validateCvv2Number('12345678', '343434343434343')).toEqual(false);
    expect(validateCvv2Number('12345', '371234567891234')).toEqual(false);
    expect(validateCvv2Number('123456', '379876543219876')).toEqual(false);
    expect(validateCvv2Number('1234567', '370000000000000')).toEqual(false);
    expect(validateCvv2Number('12345678', '373737373737373')).toEqual(false);
  });

  test('4 digits with a invalid AmEx card number should return as false', () => {
    expect(validateCvv2Number('1234', '4147100412345678')).toEqual(false);
    expect(validateCvv2Number('1234', '34987654321987')).toEqual(false);
    expect(validateCvv2Number('1234', 'qwertyuiopasdfg')).toEqual(false);
    expect(validateCvv2Number('1234', '343434343434343434')).toEqual(false);
    expect(validateCvv2Number('1234', '4147100412345678')).toEqual(false);
    expect(validateCvv2Number('1234', '37987654321987')).toEqual(false);
    expect(validateCvv2Number('1234', 'qwertyuiopasdfg')).toEqual(false);
    expect(validateCvv2Number('1234', '373737373737373737')).toEqual(false);
  });
})

describe('dates that have', () => {
  // validateDate(expMonth, currentMonth, expYear, currentYear)
  // used static dates. but in PaymentForm.js used the below:
  // const TodayDate = new Date();
  // const currentMonth = TodayDate.getMonth() + 1;
  // const currentYear = TodayDate.getFullYear();

  test('years in the future should return as true', () => {
    expect(validateDate('02', 1, '2019', 2018)).toEqual(true);
    expect(validateDate('02', 1, '2119', 2018)).toEqual(true);
    expect(validateDate('02', 1, '3019', 2018)).toEqual(true);
  });

  test('years in the past should return as false', () => {
    expect(validateDate('02', 1, '2017', 2018)).toEqual(false);
    expect(validateDate('02', 1, '1017', 2018)).toEqual(false);
    expect(validateDate('02', 1, '1', 2018)).toEqual(false);
  });

  test('a current year with a month in the future should return as true', () => {
    expect(validateDate('02', 1, '2018', 2018)).toEqual(true);
    expect(validateDate('3', 1, '2018', 2018)).toEqual(true);
    expect(validateDate('12', 1, '2018', 2018)).toEqual(true);
  });

  test('a current year with a month in the past should return as false', () => {
    expect(validateDate('01', 12, '2018', 2018)).toEqual(false);
    expect(validateDate('1', 12, '2018', 2018)).toEqual(false);
    expect(validateDate('11', 12, '2018', 2018)).toEqual(false);
  });
})

describe('names that are', () => {
  test('any non-empty string should return as true', () => {
    expect(validateName('Justin Yoo')).toEqual(true);
    expect(validateName('J')).toEqual(true);
    expect(validateName('abc')).toEqual(true);
  });

  test('empty strings should return as false', () => {
    expect(validateName('')).toEqual(false);
  });
})
