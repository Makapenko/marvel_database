const modelDates = require('../../db/models/modelDates')
const modelComics = require('../../db/models/comics')

async function removeComicFromMonths(comicsName) {
  try {
    const comicInComicsDB = await modelComics.findOne({ title: comicsName })

    if (comicInComicsDB) {
      await modelDates.updateMany(
        { comicsList: comicsName },
        { $pull: { comicsList: comicsName } }
      )
      console.log(`Комикс "${comicsName}" удален из базы с месяцами`)
    } else {
      console.log(
        `Комикс "${comicsName}" не найден в базе комиксов. Не удалено из базы с месяцами`
      )
    }
  } catch (error) {
    console.error(
      `Ошибка при удалении комикса "${comicsName}" из базы с месяцами:`,
      error
    )
  }
}

async function removeComicsFromMonthsInBulk() {
  try {
    const allComics = await modelComics.find()

    for (const comic of allComics) {
      await removeComicFromMonths(comic.title)
    }
    console.log(
      'Все комиксы были проверены и удалены из базы с месяцами при необходимости'
    )
  } catch (error) {
    console.error('Ошибка при удалении комиксов из базы с месяцами:', error)
  }
}

module.exports = { removeComicsFromMonthsInBulk }
