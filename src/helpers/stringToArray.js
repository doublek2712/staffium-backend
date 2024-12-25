function stringToArray(input) {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  return input
    .split(',')
    .map(item => item.trim())
    .filter(item => item !== ''); // Loại bỏ phần tử rỗng nếu có
}

module.exports = stringToArray