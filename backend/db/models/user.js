const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false, // Измените значение здесь на false
  },
  googleId: String,
  readComics: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Comic',
    default: [],
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User

