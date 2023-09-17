const ALPHABET = [...'abcdefghijklmnopqrstuvwxyz']

/**
 * Conta frequência de letras em um texto
 * @param {string} str
 * @returns
 */
const letterFrequencyCounter = (str) => {
  return str.split('').reduce((total, letter) => {
    total[letter] ? total[letter]++ : (total[letter] = 1)
    return total
  }, {})
}

/**
 * Calcula o índice de coincidência de um texto
 * @param {string} letterFrequency
 * @param {int} textLength
 * @returns
 */
const calculateIndexOfCoincidence = (letterFrequency, textLength) => {
  let denominator = textLength * (textLength - 1)

  let sumNumerator = 0
  Object.keys(letterFrequency).forEach((letter, index) => {
    let currentLetterValue = letterFrequency[letter]
    let numerator = currentLetterValue * (currentLetterValue - 1)
    sumNumerator += numerator
  })

  return sumNumerator / denominator
}

/**
 * Divide um texto em segmentos de acordo com o parâmetro passado
 * @param {string} source
 * @param {int} segmentLength
 * @returns
 */
const splitStringBySegmentLength = (source, segmentLength) => {
  if (!segmentLength || segmentLength < 1)
    throw Error('Número de segmento deve ser maior ou igual a 1')
  const segmentedText = []
  for (
    const array = [...source];
    array.length;
    segmentedText.push(array.splice(0, segmentLength).join(''))
  );
  return segmentedText
}

/**
 * Realiza uma operação de shift em um texto segmentado
 * @param {string} sourceText
 * @returns
 */
const shifText = (sourceText) => {
  return sourceText
    .map((chunk, index) => {
      return chunk[0]
    })
    .join('')
}

const findKey = (cipherText, keyLength) => {
  let cipher = [...cipherText]
  let plainText = ''
  for (let i = 0; i <= cipher.length; i++) {
    let p = ALPHABET.indexOf(cipher[i])
    let c = p - p
    let k = c + keyLength
    plainText += ALPHABET.at(k)
  }
  console.log(plainText)
}

const splitIntoBlocks = (cipherText, keyLength) => {
  let blocks = []
  for (
    let startIndex = 0;
    startIndex < cipherText.length;
    startIndex += keyLength
  ) {
    let endIndex = Math.min(startIndex + keyLength, cipherText.length)
    let block = cipherText.substring(startIndex, endIndex)
    blocks.push(block)
  }
  return blocks
}

/**
 * Decodifica um texto cifrado de acordo com a chave passada por parâmetro
 * @param {string} cipherText
 * @param {string} key
 * @returns
 */
const decrypt = (cipherText, key) => {
  let plainText = ''
  let cipher = [...cipherText]
  for (let i = 0; i <= cipher.length; i++) {
    let p = ALPHABET.indexOf(cipher[i])
    let k = ALPHABET.indexOf(key[i % key.length])
    let c = (p - k) % 26
    plainText += ALPHABET.at(c)
  }
  return plainText
}

module.exports = {
  calculateIndexOfCoincidence,
  splitStringBySegmentLength,
  shifText,
  letterFrequencyCounter,
  findKey,
  splitIntoBlocks,
  decrypt,
}
