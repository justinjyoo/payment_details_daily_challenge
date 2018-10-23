const isAmex = (cardNumber: string): boolean => {
  cardNumber = cardNumber.replace(/\D/g, '');
  if (cardNumber.length !== 15) return false;
  const firstTwoNumbers = cardNumber.substring(0, 2);
  if (firstTwoNumbers !== '34' && firstTwoNumbers !== '37') {
    return false;
  }
  return true;
};

const isVisa = (cardNumber: string): boolean => {
  cardNumber = cardNumber.replace(/\D/g, '');
  if (cardNumber.length !== 16) return false;
  if (cardNumber.charAt(0) !== '4') {
    return false;
  }
  return true;
};

const validateCvv2Number = (
  cvv2Number: string,
  cardNumber: string,
): boolean => {
  if (isVisa(cardNumber) && cvv2Number.length === 4) return true;
  if (isAmex(cardNumber) && cvv2Number.length === 3) return true;
  return false;
};

const validateCardNumber = (cardNumber: string): boolean => {
  return isAmex(cardNumber) || isVisa(cardNumber);
};

const validateDate = (
  expMonth: string,
  currentMonth: number,
  expYear: string,
  currentYear: number,
): boolean => {
  const expMonthInt = parseInt(expMonth);
  const expYearInt = parseInt(expYear);
  if (expYearInt < currentYear) return false;
  if (expMonthInt < currentMonth && expYearInt <= currentYear) {
    return false;
  }
  if (expMonth.length !== 2 || expYear.length !== 4) return false;
  return true;
};

const validateName = (name: string) => {
  if (name.length < 1 || name === 'Name') return false;
  return true;
};

module.exports = {
  validateCardNumber: validateCardNumber,
  validateCvv2Number: validateCvv2Number,
  validateDate: validateDate,
  validateName: validateName,
};
