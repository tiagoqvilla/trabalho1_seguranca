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
const MOST_FREQUENT_LETTER_PORTUGUESE = 'a'
const MOST_FREQUENT_LETTER_ENGLISH = 'e'


const textPortuguese = readFile('plaintext_portuguese.txt')
const textEnglish = readFile('plaintext_english.txt')

let splittedText = splitStringBySegmentLength(textPortuguese, 7)

let shifted = shifText(splittedText)

let shiftedCounter = letterFrequencyCounter(shifted)
let ioc = calculateIndexOfCoincidence(shiftedCounter, shifted.length)

let blocks = splitIntoBlocks(textEnglish, 7)
let counts = blocks.map((block) => letterFrequencyCounter(block))
let totalsCount = textPortuguese.length

const createGroups = (blocks, keyLength) => {
    let groups = {}
    for (let i = 0; i < keyLength; i++) {
        groups[`group_${i}`] = ''
    }

    blocks.forEach((block) => {
        for (let i = 0; i < block.length; i++) {
            groups[`group_${i}`] += block[i]
          }
    })

    return groups
}

const getMaxValueLetter = (objectCount) => {
    return Object.keys(objectCount).reduce((a, b) => objectCount[a] > objectCount[b] ? a : b)
}

const guessKey = (groups) => {
    let probableKey = ''
    Object.keys(groups).forEach((group) => {
        let groupCount = letterFrequencyCounter(groups[group])
        let highestLetterCount = getMaxValueLetter(groupCount)
        let difference = ALPHABET.indexOf(highestLetterCount) - ALPHABET.indexOf(MOST_FREQUENT_LETTER_ENGLISH)
        probableKey += ALPHABET.at(difference)
    })
    return probableKey
}

let groups = createGroups(blocks, 7)





