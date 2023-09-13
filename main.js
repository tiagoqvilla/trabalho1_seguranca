const { log } = require('console')
const counter = require('./letter_frequency.js')
const readFile = require('./read_file.js')

const textPortuguese = readFile('plaintext_portuguese.txt')
const textEnglish = readFile('plaintext_english.txt')

const portugueseLetterFrequency = counter(textPortuguese)
const englishLetterFrequency = counter(textEnglish)


const calculateIndexOfCoincidence = (letterFrequency, textLength) => {
    let N = textLength * (textLength - 1)

    let sumF = 0
    Object.keys(letterFrequency).forEach((letter, index) => {
        let currentLetterValue = letterFrequency[letter]
        let F = currentLetterValue * (currentLetterValue - 1)
        sumF += F
    })

    return sumF / N

}

let indexOfCoincidenceEnglish = calculateIndexOfCoincidence(englishLetterFrequency, textEnglish.length)
let indexOfCoincidencePortuguese = calculateIndexOfCoincidence(portugueseLetterFrequency, textPortuguese.length)