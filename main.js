const readFile = require('./fileReader.js')
const {
  calculateIndexOfCoincidence,
  splitStringBySegmentLength,
  shifText,
  letterFrequencyCounter,
  decrypt,
  findKey,
  splitIntoBlocks,
} = require('./vigenereUtils.js')
const ALPHABET = [...'abcdefghijklmnopqrstuvwxyz']

const textPortuguese = readFile('plaintext_portuguese.txt')
const textEnglish = readFile('plaintext_english.txt')

let splittedText = splitStringBySegmentLength(textPortuguese, 7)

let shifted = shifText(splittedText)

let shiftedCounter = letterFrequencyCounter(shifted)
let ioc = calculateIndexOfCoincidence(shiftedCounter, shifted.length)

let blocks = splitIntoBlocks(textPortuguese, 7)
console.log(blocks)
let counts = blocks.map((block) => letterFrequencyCounter(block))
console.log(counts)
let totalsCount = textPortuguese.length

let digitToFrequencies = []
counts.forEach((count) => {
  let totalsCount = Object.keys(count).reduce(
    (acc, currentValue) => acc + count[currentValue],
    0
  )

  let frequencies = []
  Object.keys(count).forEach((entry) => {
    let frequency = count[entry] / totalsCount
    let characterFrequency = {}
    characterFrequency[`${entry}`] = frequency
    frequencies.push(characterFrequency)
  })
  digitToFrequencies.push(frequencies)
})

const guessKey = (frequencies) => {
  let possibleKey = ''
  frequencies.forEach((frequency) => {
    let mostFrequentChar = Object.keys(frequency[0])[0]
    let keyInt = ALPHABET.indexOf(mostFrequentChar) - ALPHABET.indexOf('a')
    keyInt = keyInt >= 0 ? keyInt : keyInt + ALPHABET.length
    let key = ALPHABET[ALPHABET.indexOf('a') + keyInt]
    possibleKey += key
  })
}

guessKey(digitToFrequencies)
decrypt(textEnglish, 'meunome')
