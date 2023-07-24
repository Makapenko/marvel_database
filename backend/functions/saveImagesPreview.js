require('dotenv').config()
const axios = require('axios').default
const streamifier = require('streamifier')
const { S3 } = require('aws-sdk')
const modelComics = require('../db/models/comics')
const fs = require('fs')
const sharp = require('sharp')

const accessKeyId = process.env.ACCESS_KEY_ID
const secretAccessKey = process.env.SECRET_ACCESS_KEY
const bucketName = process.env.BUCKET_NAME

async function saveImagesPreview(req, res) {
  const s3 = new S3({
    endpoint: 'https://storage.yandexcloud.net',
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  })
  // Чтение файла со списком названий комиксов
  const comicsArray = fs
    .readFileSync('comicsWithoutPreview.txt', 'utf-8')
    .split('\n')

  let currentIndex = 0
  async function downloadAndSaveImage() {
    if (currentIndex >= comicsArray.length) {
      console.log('All images have been processed.')
      return
    }
    try {
      const formattedComicName = comicsArray[currentIndex]
        .replace(/[:]/gi, '')
        .replace(/[\/]/gi, ' ')
        .replace(/  /gm, ' ')

      console.log(`Downloading:  ${currentIndex + 1} ${formattedComicName}.jpg`)

      // Получение полноформатного изображения из Яндекс.Облака
      const response = await axios.get(
        `https://storage.yandexcloud.net/${bucketName}/comics/${formattedComicName}.jpg`,
        {
          responseType: 'arraybuffer',
        }
      )

      const imageData = Buffer.from(response.data)
      // Создание превью изображения с высотой 150 пикселей
      const previewImageData = await sharp(imageData)
        .resize({ height: 150 })
        .toBuffer()

      const previewImageStream = streamifier.createReadStream(previewImageData)

      // Загрузка превью изображения в S3
      const uploadPreviewStream = s3.upload({
        Bucket: bucketName,
        Key: `comics/preview/${formattedComicName}.jpg`,
        ContentType: 'image/jpeg',
        ACL: 'public-read',
        Body: previewImageStream,
      })

      uploadPreviewStream.on('httpUploadProgress', progress => {
        console.log(
          `Uploading: ${Math.round((progress.loaded / progress.total) * 100)}%`
        )
      })
      await uploadPreviewStream.promise()
      const previewImageUrl = `https://storage.yandexcloud.net/${bucketName}/comics/preview/${formattedComicName}.jpg`

      // Обновление существующей записи в базе данных MongoDB
      await modelComics.findOneAndUpdate(
        { title: comicsArray[currentIndex] },
        { previewUrl: previewImageUrl }
      )

      console.log(`Image saved: ${previewImageUrl}`)
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

module.exports = { saveImagesPreview }
