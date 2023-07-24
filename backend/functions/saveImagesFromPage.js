require('dotenv').config()
const axios = require('axios').default
const streamifier = require('streamifier')
const { S3 } = require('aws-sdk')
const modelComics = require('../db/models/comics')
const fs = require('fs')
const sharp = require('sharp')
const { fetchComicCoverUrl } = require('./getImgUrlFromPage')

const accessKeyId = process.env.ACCESS_KEY_ID
const secretAccessKey = process.env.SECRET_ACCESS_KEY
const bucketName = process.env.BUCKET_NAME

async function saveImagesFromPage(req, res) {
  const s3 = new S3({
    endpoint: 'https://storage.yandexcloud.net',
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  })

  const comicsListFromFile = fs.readFileSync('comicsNamesWithoutUrl.txt', 'utf8')
  const comicsArray = comicsListFromFile.split('\n')

  let currentIndex = 0

  async function downloadAndSaveImage() {
    if (currentIndex >= comicsArray.length) {
      console.log('All images have been processed.')
      return
    }

    try {
      const formattedComicName = comicsArray[currentIndex]
        .replace(/  /gm, '_')

      // Загрузка изображения с внешнего сервера
      console.log(`Downloading:  ${currentIndex + 1} ${formattedComicName}.jpg`)
      const comicCoverUrl = await fetchComicCoverUrl(formattedComicName)
      const response = await axios.get(comicCoverUrl, {
        responseType: 'arraybuffer',
        timeout: 15000, // Установка таймаута для запроса (30 секунд)
      }) // Создание стрима из буфера

      const imageData = Buffer.from(response.data)

      // Создание превью изображения с высотой 150 пикселей
      const previewImageData = await sharp(imageData)
        .resize({ height: 150 })
        .toBuffer()
      const imageStream = streamifier.createReadStream(imageData)
      const previewImageStream = streamifier.createReadStream(previewImageData)

      // Загрузка изображения в S3
      const uploadStream = s3.upload({
        Bucket: bucketName,
        Key: `comics/${formattedComicName}.jpg`,
        ContentType: 'image/jpeg',
        ACL: 'public-read',
        Body: imageStream,
      })

      // Загрузка превью изображения в S3
      const uploadPreviewStream = s3.upload({
        Bucket: bucketName,
        Key: `comics/preview/${formattedComicName}.jpg`,
        ContentType: 'image/jpeg',
        ACL: 'public-read',
        Body: previewImageStream,
      })

      uploadStream.on('httpUploadProgress', progress => {
        console.log(
          `Uploading: ${Math.round((progress.loaded / progress.total) * 100)}%`
        )
      })

      uploadPreviewStream.on('httpUploadProgress', progress => {
        console.log(
          `Uploading: ${Math.round((progress.loaded / progress.total) * 100)}%`
        )
      })

      await uploadStream.promise()
      await uploadPreviewStream.promise()

      const imageUrl = `https://storage.yandexcloud.net/${bucketName}/comics/${formattedComicName}.jpg`
      const previewImageUrl = `https://storage.yandexcloud.net/${bucketName}/comics/preview/${formattedComicName}.jpg`

      // Обновление существующей записи в базе данных MongoDB
      await modelComics.findOneAndUpdate(
        { title: comicsArray[currentIndex] },
        { coverUrl: imageUrl, previewUrl: previewImageUrl }
      )

      console.log(`Image saved: ${imageUrl}`)
      currentIndex++
      // Переход к следующему изображению через некоторое время
      setTimeout(downloadAndSaveImage, 1000)
    } catch (error) {
      console.log(
        'не скачалось',
        comicsArray[currentIndex]
          .replace(/[:]/gi, '')
          .replace(/[\/]/gi, ' ')
          .replace(/  /gm, ' ')
      )
      console.error(error)

      // Повторная попытка загрузки изображения через некоторое время
      setTimeout(downloadAndSaveImage, 10000)
      currentIndex++
    }
  }

  await downloadAndSaveImage()

  res.send('test')
}

module.exports = { saveImagesFromPage }
