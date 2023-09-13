const fs = require('fs')

const readFile = (file) => {
  const buffer = fs.readFileSync(file)

  const fileContent = buffer.toString()

  return fileContent
}

module.exports = readFile
