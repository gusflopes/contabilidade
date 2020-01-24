const formatMonth = n => {
  return n > 9 ? `${n}` : `0${n}`;
};

module.exports = formatMonth;
