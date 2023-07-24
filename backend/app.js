const express = require('express')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')
const routes = require('./routes')
const hbs = require('hbs')
const session = require('express-session')
const passport = require('passport')
const { findOrCreateUser, getUserById } = require('./userController') // Обработка пользователей в MongoDB
const { OAuth2Client } = require('google-auth-library') // Добавьте этот импорт
require('dotenv').config()

const app = express()
const PORT = 3001

app.use(
  session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())

// Создайте новый экземпляр OAuth2Client
const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await getUserById(id)
  done(null, user)
})



const connect = require('./db/connect')

connect()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

hbs.registerHelper('range', function (start, end) {
  const range = []
  for (let i = start; i <= end; i++) {
    range.push(i)
  }
  return range
})

// CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}
app.use(cors(corsOptions))

app.use(express.static(path.join(__dirname, 'public')))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/auth/google/callback', async (req, res) => {
  const { tokenId } = req.body;

  if (!tokenId) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    
    const profile = {
      id: payload.sub,
      displayName: payload.name,
      email: payload.email,
    };
    const user = await findOrCreateUser(profile); 
    return res.json({ success: true, user });
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Authentication failed' });
  }
});

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
