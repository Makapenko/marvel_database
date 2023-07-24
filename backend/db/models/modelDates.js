const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const marvelDateSchema = new Schema({
  date: String,
  comicsList: Array
});


module.exports = model("marvelDate", marvelDateSchema);
