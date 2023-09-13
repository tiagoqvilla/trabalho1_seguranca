const counter = require('./letter_frequency.js')
const readFile = require('./read_file.js')

const textPortuguese = readFile('plaintext_portuguese.txt')
const textEnglish = readFile('plaintext_english.txt')

const portugueseLetterFrequency = counter(textPortuguese)
const englishLetterFrequency = counter(textEnglish)

// TODO calcular índice de coincidência
