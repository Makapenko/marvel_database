const fetch = require('node-fetch')
const modelComics = require('../db/models/comics')
const fs = require('fs')
const path = require('path')

async function savePreviewImg(req, res) {
    try {
        // Получаем комиксы из базы данных, у которых есть coverUrl и нет previewUrl
        const comics = await modelComics.find({ coverUrl: { $exists: true }, previewUrl: { $exists: false } });

        // Создаем строку с названиями комиксов
        const titles = comics.map(comic => comic.title).join('\n');

        // Записываем названия в файл
        fs.writeFileSync(path.join(__dirname, 'comics.txt'), titles);

        res.status(200).send('Comics titles saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while saving comics titles');
    }
}

module.exports = { savePreviewImg }
