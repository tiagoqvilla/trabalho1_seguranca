const readFile = require('./fileReader.js')
const {
  calculateIndexOfCoincidence,
  splitStringBySegmentLength,
  shifText,
  letterFrequencyCounter,
  decrypt,
  splitIntoBlocks,
  guessKey,
  createGroups
} = require('./vigenereUtils.js')

const textPortuguese = readFile('plaintext_portuguese.txt')
const textEnglish = readFile('plaintext_english.txt')

// Análise do texto para adivinhar tamanho da chave ----------
let splittedText = splitStringBySegmentLength(textPortuguese, 7)
let shifted = shifText(splittedText)
let shiftedCounter = letterFrequencyCounter(shifted)
let ioc = calculateIndexOfCoincidence(shiftedCounter, shifted.length)

// Decodificação --------

// Divide o texto em blocos de acordo com o tamanho da chave
let blocks = splitIntoBlocks(textEnglish, 7)
let groups = createGroups(blocks, 7)

// De acordo com os agrupamentos de texto, adivinha a chafe para decifrar o texto
let probableKey = guessKey(groups)
let plaintext = decrypt(textEnglish, probableKey)
