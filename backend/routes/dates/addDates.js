const fetch = require('node-fetch')
const modelDates = require('../../db/models/modelDates')

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const fetchMonthData = async (year, month, delayBetweenRequests) => {
  const apiUrl = 'https://marvel.fandom.com/api.php'
  const link = `${apiUrl}?action=parse&page=Category:${year},_${month}_Cover_Date&maxlag=5&format=json`

  try {
    await delay(delayBetweenRequests) // Задержка перед каждым запросом
    const response = await fetch(link)
    const data = await response.json()

    if (!data.parse) {
      console.error(`Нет данных для ${year}, ${month}`)
      return
    }

    const oldDateName = data.parse.title
    const dateName = oldDateName.slice(9, -11)
    console.log(dateName)

    const links = data.parse.links
    const comicTitles = links.filter(link => link.ns < 1).map(link => link['*'])

    await modelDates.create({
      date: dateName,
      comicsList: comicTitles,
    })
  } catch (error) {
    console.error(`Ошибка при получении данных для ${year}, ${month}:`, error)
  }
}

async function addDates(req, res) {
  const startYear = 2000
  const endYear = 2023
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const requestsPerMinute = 20
  const delayBetweenRequests = (60 * 1000) / requestsPerMinute
  let isParsingCompleted = false
  let processedMonths = 0
 
  try {
    for (let year = startYear; year <= endYear; year++) {
      for (let monthIndex = 0; monthIndex <= 11; monthIndex++) {
        const month = months[monthIndex]
        const dateName = `${year}, ${month}`

        const existingDate = await modelDates.findOne({ date: dateName })
        if (existingDate) {
          console.log(`Дата ${dateName} уже существует. Пропускаем...`)
          continue
        }

        await fetchMonthData(year, month, delayBetweenRequests)
        await delay(delayBetweenRequests) // Задержка перед каждой итерацией цикла
        processedMonths++
        console.log(`Обработано месяцев: ${processedMonths}`)
      }
    }
    isParsingCompleted = true
  } catch (error) {
    console.error('Ошибка во время парсинга:', error)
  }

  if (isParsingCompleted) {
    res.redirect(`/`)
  }
}

module.exports = { addDates }
