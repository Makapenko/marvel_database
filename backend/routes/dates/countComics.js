const modelDates = require('../../db/models/modelDates');

async function countComics(req, res) {
  try {
    const allDates = await modelDates.find();
    const totalComics = allDates.reduce((sum, record) => sum + record.comicsList.length, 0);
    res.json({ totalComics });
  } catch (error) {
    console.error("Ошибка при подсчете комиксов:", error);
    res.status(500).json({ error: "Произошла ошибка при подсчете комиксов" });
  }
}

module.exports = { countComics }
