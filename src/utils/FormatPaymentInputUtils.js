const formatAmex = (cardNumber: string) => {
  return (
    cardNumber.substring(0, 4) +
    ' ' +
    cardNumber.substring(4, 10) +
    ' ' +
    cardNumber.substring(10, 15)
  );
};

const formatVisa = (cardNumber: string): string => {
  let newString = '';
  for (var i = 0; i < cardNumber.length - 4; i += 4) {
    newString = newString + cardNumber.substring(i, i + 4) + ' ';
  }
  newString = newString + cardNumber.substring(12, 16);
  return newString;
};

const formatCardNumber = (cardNumber: string): string => {
  if (cardNumber.length === 16) return formatVisa(cardNumber);
  if (cardNumber.length === 15) return formatAmex(cardNumber);
  return cardNumber;
};

// manual formats for specific input cases
const formatMonth = (month: string): string => {
  if (month.length === 0) return month;
  if (month === '00') return '0';
  if (parseInt(month) > 12) return '12';
  if (month.length === 1 && parseInt(month) > 0) return '0' + month;
  if (month.length === 2) return month;
  return parseInt(month).toString();
};

const formatYear = (year: string): string => {
  if (year.length === 0) return year;
  if (year.length > 4) return year.substring(0, 4);
  return year;
};

module.exports = {
  formatCardNumber: formatCardNumber,
  formatMonth: formatMonth,
  formatYear: formatYear,
};
