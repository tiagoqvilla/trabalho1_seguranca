const readFile = require('./fileReader.js')
const {
  calculateIndexOfCoincidence,
  splitStringBySegmentLength,
  shifText,
  letterFrequencyCounter,
  decrypt,
} = require('./vigenereUtils.js')

const textPortuguese = readFile('plaintext_portuguese.txt')
const textEnglish = readFile('plaintext_english.txt')

let splittedText = splitStringBySegmentLength(textPortuguese, 7)

let shifted = shifText(splittedText)

let shiftedCounter = letterFrequencyCounter(shifted)
let ioc = calculateIndexOfCoincidence(shiftedCounter, shifted.length)

decrypt(textPortuguese, 'meunome')
