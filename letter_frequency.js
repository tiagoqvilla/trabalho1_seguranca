const counter = (str) => {
  return str.split('').reduce((total, letter) => {
    total[letter] ? total[letter]++ : (total[letter] = 1)
    return total
  }, {})
}

module.exports = counter
