const fs = require('fs')

const modelComics = require('../db/models/comics')

async function writeComicsNamesWithoutUrlToFile(req, res) {
  // Ищем комиксы, где coverUrl отсутствует или равен null
  let comicsWithoutCoverUrl = await modelComics.find({
    $or: [{ coverUrl: { $exists: false } }, { coverUrl: null }],
  })
  .sort({ title: 1 }) // Сортировка по названию в алфавитном порядке

  comicsWithoutCoverUrl.forEach(comic => {
    fs.appendFileSync('comicsNamesWithoutUrl.txt', `\n${comic.title}`)
  })

  res.send('Файл сохранен')
}

module.exports = { writeComicsNamesWithoutUrlToFile }
