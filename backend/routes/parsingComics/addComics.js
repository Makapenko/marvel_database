const fetch = require('node-fetch')
const modelComics = require('../../db/models/comics')
const fs = require('fs')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function fetchComicData(comicsName, delayBetweenRequests) {
  const apiUrl = 'https://marvel.fandom.com/api.php'
  const link = `${apiUrl}?action=parse&page=${encodeURIComponent(
    comicsName
  )}&maxlag=5&format=json`

  try {
    await delay(delayBetweenRequests) // Задержка перед каждым запросом
    const response = await fetch(link)
    const data = await response.json()

    if (!data.parse) {
      console.error(`Нет данных для ${comicsName}`)
      return
    }

    return data
  } catch (error) {
    console.error(`Ошибка при получении данных для ${comicsName}:`, error)
  }
}

function parseCategories(data) {
  return data.parse.categories.map(category => category['*'])
}

async function addComics(req, res) {
  const requestsPerMinute = 200
  const delayBetweenRequests = (60 * 1000) / requestsPerMinute
  const comicsListFromFile = fs.readFileSync('allComicsNames.txt', 'utf8')
  const arrAllComics = comicsListFromFile.split('\n')
  
  let isParsingCompleted = false
  let processedComicsCount = 0

  // await Promise.all(

      for (const comicsName of arrAllComics) {
        console.log(comicsName)

        const existingComic = await modelComics.findOne({ title: comicsName })
        if (existingComic) {
          console.log(`Комикс ${comicsName} уже существует. Пропускаем...`)
          continue
        }

        try {
          const data = await fetchComicData(comicsName, delayBetweenRequests)
          const categories = parseCategories(data)
          // const sections = parseSections(data)

          await modelComics.create({
            title: comicsName,
            categories: categories,
          })
          processedComicsCount++
          console.log(`Обработано ${processedComicsCount} комиксов.`)
          await delay(delayBetweenRequests)
        } catch (error) {
          console.error(`Ошибка при обработке комикса ${comicsName}:`, error)
        }
      }
   
  // )

  isParsingCompleted = true

  if (isParsingCompleted) {
    res.redirect(`/`)
  }
}

module.exports = { addComics }
