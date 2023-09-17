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

module.exports = {
  calculateIndexOfCoincidence,
  splitStringBySegmentLength,
  shifText,
  letterFrequencyCounter,
}
