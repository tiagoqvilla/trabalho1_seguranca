const ALPHABET = [...'abcdefghijklmnopqrstuvwxyz']
const MOST_FREQUENT_LETTER_PORTUGUESE = 'a'
const MOST_FREQUENT_LETTER_ENGLISH = 'e'

/**
 * Retorna o provável tamanho da chave
 * @param {string} text
 * @param {number} languageIC
 * @returns
 */
const guessKeyLength = (text, languageIC) => {
  let probableKeyLength = 1
  let delta = 1
  for (let i = 2; i <= 15; i++) {
    let splittedText = splitStringBySegmentLength(text, i)
    let shifted = shifText(splittedText)
    let shiftedCounter = letterFrequencyCounter(shifted)
    let ioc = calculateIndexOfCoincidence(shiftedCounter, shifted.length)
    console.log(`Tamanho: ${i} - IC: ${ioc}`)
    let currentDifference = languageIC - ioc
    if (currentDifference < delta) {
      probableKeyLength = i
      delta = currentDifference
    }
  }
  return probableKeyLength
}

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
 * @param {number} textLength
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
 * @param {number} segmentLength
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
 * Divide o texto em N grupos de acordo com o tamanho da chave para que seja feita a análise análoga a uma cifra de César
 * @param {array} blocks Texto dividido em blocos
 * @param {int} keyLength Tamanho da chave
 * @returns Object
 */
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

/**
 * Retorna o caracter com a maior contagem dado um texto
 * @param {Object} objectCount Objeto contendo a contagem de caracteres de um texto
 * @returns
 */
const getMaxValueLetter = (objectCount) => {
  return Object.keys(objectCount).reduce((a, b) =>
    objectCount[a] > objectCount[b] ? a : b
  )
}

/**
 * Retorna a provável chave que cifra o texto
 * @param {Object} groups Grupos de texto para que seja feita a análise
 * @returns
 */
const guessKey = (groups) => {
  let probableKey = ''
  Object.keys(groups).forEach((group) => {
    let groupCount = letterFrequencyCounter(groups[group])
    let highestLetterCount = getMaxValueLetter(groupCount)
    let difference =
      ALPHABET.indexOf(highestLetterCount) -
      ALPHABET.indexOf(MOST_FREQUENT_LETTER_ENGLISH)
    probableKey += ALPHABET.at(difference)
  })
  return probableKey
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
  createGroups,
  guessKey,
  guessKeyLength,
  decrypt,
}
