const modelDates = require('../../db/models/modelDates')

async function deleteComicsByYear(year) {
  try {
    // Создайте регулярное выражение, которое соответствует датам за определенный год
    const dateRegex = new RegExp(`^${year}`)

    // Удалите все записи, у которых поле 'date' соответствует регулярному выражению
    const result = await modelDates.deleteMany({ date: dateRegex })

    console.log(`Удалено записей: ${result.deletedCount}`)
  } catch (error) {
    console.error(`Ошибка при удалении записей за ${year} год:`, error)
  }
}

async function deleteDates(req, res) {
  const year = req.body.year // Получите значение года из запроса
  if (year) {
    await deleteComicsByYear(year)
  }
  res.redirect('/') // Вернитесь на главную страницу после удаления данных
}

module.exports = { deleteDates }
