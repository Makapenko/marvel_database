const express = require('express')
const router = express.Router()
const modelComics = require('./db/models/comics')

const {
  writeAllComicsNamesToFile,
} = require('./functions/writeAllComicsNamesToFile')
const {
  writeComicsNamesWithoutUrlToFile,
} = require('./functions/writeComicsNamesWithoutUrlToFile')
const { saveImages } = require('./functions/saveImages')
const { saveImagesFromPage } = require('./functions/saveImagesFromPage')
const { savePreviewImg } = require('./functions/savePreviewImg')
const { saveImagesPreview } = require('./functions/saveImagesPreview')

// Dates
const { addDates } = require('./routes/dates/addDates')
const { addDatesNew } = require('./routes/dates/addDatesNew') // для сохранения в отдельный файл списка комиксов, которых ещё нет в бд
const { deleteDates } = require('./routes/dates/deleteDates')
const { countComics } = require('./routes/dates/countComics')
const {
  removeComicsFromMonthsInBulk,
} = require('./routes/dates/removeComicsFromMonthsInBulk')
const {
  writeComicsNamesToFileFromDates,
} = require('./routes/dates/writeComicsNamesToFileFromDates')

// Parsing Comics
const { addComics } = require('./routes/parsingComics/addComics')

// Change Comics
const { changeComicsInfo } = require('./routes/changeComics/changeComicsInfo')

// User
const { addComicsToUserList } = require('./routes/user/addComicsToUserList')
const {
  removeComicsFromUserList,
} = require('./routes/user/removeComicsFromUserList')

router.get('/', (req, res) => {
  res.render('index', { title: 'MarvelDB' })
})

router.get('/showComics', async (req, res) => {
  // Создаем регулярное выражение для поиска комиксов по году
  const yearFromFront = parseInt(req.query.year)

  // Готовим фильтр для поиска комиксов по году
  const yearFilter = {
    $gte: yearFromFront * 100,
    $lt: (yearFromFront + 1) * 100,
  }

  const comList = await modelComics
    .find({
      yearandmonth: yearFilter,
    })
    .select('-categories')

  res.json(comList)
})

//--------------------
router.get('/showComicsWitchImage', async (req, res) => {
  const comList = await modelComics.find({
    coverUrl: { $exists: true },
  })

  res.json(comList)
})

router.delete('/deleteCoverUrl/:id', async (req, res) => {
  try {
    const { id } = req.params
    await modelComics.findByIdAndUpdate(id, { coverUrl: null })
    res.status(200).json({ message: 'Cover URL deleted successfully' })
  } catch (error) {
    res
      .status(400)
      .json({ error: 'An error occurred while deleting the cover URL' })
  }
})

router.put('/updateNotMarvel', async (req, res) => {
  try {
    const titleStart = req.body.titleStart
    const regex = new RegExp(`^${titleStart}.* Vol `, 'i')

    const result = await modelComics.updateMany(
      { title: { $regex: regex } },
      { notMarvel: true }
    )
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
// для картинок
// app.get('/get_img', async (req, res) => {
//   const img_url = req.query.url;

//   try {
//     const response = await axios.get(img_url, {
//       responseType: 'arraybuffer'
//     })
//     let contentType = response.headers['content-type']
//     let imgC = response.data
//     res.set('Content-Type', contentType)
//     res.set('Cache-Control', 'public')
//     res.set('max-age', '3153')
//     res.send(imgC)
//   }
//   catch (e) { console.error(e) }
// });

router.post('/change-comics-info', changeComicsInfo)
router.post('/write-names-file', writeAllComicsNamesToFile)
router.post('/write-without-url', writeComicsNamesWithoutUrlToFile)
router.post('/save-images', saveImages)
router.post('/save-images-from-page', saveImagesFromPage)
router.post('/save-preview-img', savePreviewImg)
router.post('/save-images-preview', saveImagesPreview)

// Dates
router.post('/addDates', addDates)
router.post('/addDatesNew', addDatesNew)
router.post('/deleteDates', deleteDates)
router.get('/comics-count', countComics)
router.post('/remove-comics-from-months', removeComicsFromMonthsInBulk)
router.post('/writeComicsNamesToFileFromDates', writeComicsNamesToFileFromDates)

// Parsing Comics
router.post('/addComics', addComics)

// User
router.put('/users/:userId/comics/:comicId', addComicsToUserList)
router.delete('/users/:userId/comics/:comicId', removeComicsFromUserList)

module.exports = router
