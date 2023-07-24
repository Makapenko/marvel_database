const fs = require('fs')
const modelDates = require('../../db/models/modelDates')

async function writeComicsNamesToFileFromDates(req, res) {
  let allComics = await modelDates.find({}) // массив со всей бд

  allComics.forEach(el => {
    const comicsList = el.comicsList.join('\n')
    fs.appendFileSync('allComicsNames.txt', `${comicsList}\n`)
  })

  res.send('Файл сохранен')
}

module.exports = { writeComicsNamesToFileFromDates }
