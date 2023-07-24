const fs = require('fs')

// ------ Код создаёт файл со списком всех комиксов в бд;
const modelComics = require('../db/models/comics')

async function writeAllComicsNamesToFile(req, res) {
  let allComics = await modelComics.find({}) // массив со всей бд

  allComics.forEach(el => {
    fs.appendFileSync('allComicsNames.txt', `\n${el.title}`)
  })

  res.send('Файл сохранен')
}

module.exports = { writeAllComicsNamesToFile }
