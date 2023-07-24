const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const marvelComicsSchema = new Schema({
  title: String,
  coverUrl: String, // Ссылка на обложку на Yandex Cloud
  previewUrl: String, // Ссылка на превью обложки
  categories: Array, // появления и создатели
  appearances: Array, // появления
  minorAppearances: Array, // короткие появления
  mentions: Array, // упоминания
  sections: Array, // названия глав
  reprints: {type: Boolean, default: false },
  reprintsArr: Array, // список репринтов в комиксе
  notMarvel: Boolean, // НЕ МАРВЕЛ
  yearandmonth: Number, // год и месяц одним числом
  coverArtist: Array, // художник обложка
  editorInChief: Array, // главный редактор
  writer: Array, // писатель
  penciler: Array, // карандаш
  inker: Array, // тушь
  letterer: Array, // буквы
  editor: Array, // редактор
  colorist: Array, // цвет
});


// module.exports = model("marvelComics", marvelComicsSchema);
module.exports = model("marvelComics", marvelComicsSchema, 'comics');
