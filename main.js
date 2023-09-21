const readFile = require('./fileReader.js')
const {
  decrypt,
  splitIntoBlocks,
  guessKey,
  createGroups,
  guessKeyLength,
} = require('./vigenereUtils.js')

const textPortuguese = readFile('plaintext_portuguese.txt')
const textEnglish = readFile('plaintext_english.txt')
const IC_PORTUGUESE = 0.0775
const IC_ENGLISH = 0.0667

// Passo 1:
// Análise do texto para adivinhar tamanho da chave ----------

//let keyLength = guessKeyLength(textEnglish, IC_ENGLISH)
let keyLength = guessKeyLength(textPortuguese, IC_PORTUGUESE)
console.log(`Provável tamanho da chave: ${keyLength}`)

// Passo 2:
// Decodificação --------

// Divide o texto em blocos de acordo com o tamanho da chave
let blocks = splitIntoBlocks(textEnglish, keyLength)
let groups = createGroups(blocks, keyLength)

// De acordo com os agrupamentos de texto, adivinha a chafe para decifrar o texto
let probableKey = guessKey(groups)
let plaintext = decrypt(textEnglish, probableKey)
//console.log(plaintext)
