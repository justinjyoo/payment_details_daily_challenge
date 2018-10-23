const {
  formatCardNumber,
  formatMonth,
  formatYear,
} = require('../src/utils/FormatPaymentInputUtils');

describe('card numbers that are', () => {
  test('valid should be formatted', () => {
    expect(formatCardNumber('4147100412345678')).toEqual('4147 1004 1234 5678');
    expect(formatCardNumber('4123456789123456')).toEqual('4123 4567 8912 3456');
    expect(formatCardNumber('4987654321987654')).toEqual('4987 6543 2198 7654');
    expect(formatCardNumber('4000000000000000')).toEqual('4000 0000 0000 0000');
    expect(formatCardNumber('4444444444444444')).toEqual('4444 4444 4444 4444');
    expect(formatCardNumber('341234567891234')).toEqual('3412 345678 91234');
    expect(formatCardNumber('349876543219876')).toEqual('3498 765432 19876');
    expect(formatCardNumber('340000000000000')).toEqual('3400 000000 00000');
    expect(formatCardNumber('343434343434343')).toEqual('3434 343434 34343');
    expect(formatCardNumber('371234567891234')).toEqual('3712 345678 91234');
    expect(formatCardNumber('379876543219876')).toEqual('3798 765432 19876');
    expect(formatCardNumber('370000000000000')).toEqual('3700 000000 00000');
    expect(formatCardNumber('373737373737373')).toEqual('3737 373737 37373');
  });

  test('invalid should not be formatted', () => {
    expect(formatCardNumber('4')).toEqual('4');
    expect(formatCardNumber('40000000000000000000')).toEqual('40000000000000000000');
    expect(formatCardNumber('Justin Yoo')).toEqual('Justin Yoo');
    expect(formatCardNumber('J123')).toEqual('J123');
    expect(formatCardNumber('1234dsafsd.we8q92lk')).toEqual('1234dsafsd.we8q92lk');
  });
})

describe('months that are', () => {
  test('correctly formatted should return the inputted month', () => {
    expect(formatMonth('01')).toEqual('01');
    expect(formatMonth('02')).toEqual('02');
    expect(formatMonth('03')).toEqual('03');
    expect(formatMonth('04')).toEqual('04');
    expect(formatMonth('05')).toEqual('05');
    expect(formatMonth('06')).toEqual('06');
    expect(formatMonth('07')).toEqual('07');
    expect(formatMonth('08')).toEqual('08');
    expect(formatMonth('09')).toEqual('09');
    expect(formatMonth('10')).toEqual('10');
    expect(formatMonth('11')).toEqual('11');
    expect(formatMonth('12')).toEqual('12');
  });

  test('greater than 0 and less than 13 should be formatted', () => {
    expect(formatMonth('1')).toEqual('01');
    expect(formatMonth('2')).toEqual('02');
    expect(formatMonth('3')).toEqual('03');
    expect(formatMonth('4')).toEqual('04');
    expect(formatMonth('5')).toEqual('05');
    expect(formatMonth('6')).toEqual('06');
    expect(formatMonth('7')).toEqual('07');
    expect(formatMonth('8')).toEqual('08');
    expect(formatMonth('9')).toEqual('09');
    expect(formatMonth('10')).toEqual('10');
    expect(formatMonth('11')).toEqual('11');
    expect(formatMonth('12')).toEqual('12');
  });

  test('greater than 12 should be formatted to 12', () => {
    expect(formatMonth('13')).toEqual('12');
    expect(formatMonth('123')).toEqual('12');
    expect(formatMonth('40000000000000000000')).toEqual('12');
  });
})

describe('years that are', () => {
  test('are greater than length of 4 should return the first four characters', () => {
    expect(formatYear('20189')).toEqual('2018');
    expect(formatYear('20189fdsafdsa')).toEqual('2018');
  });

  test('less than length of 4 should return the inputted year', () => {
    expect(formatYear('2')).toEqual('2');
    expect(formatYear('20')).toEqual('20');
    expect(formatYear('201')).toEqual('201');
  });

  test('empty strings should return empty', () => {
    expect(formatYear('')).toEqual('');
  });
})
