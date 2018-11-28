require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const { json } = require('body-parser')
const cors = require('cors')
const PORT = 3001

const app = express()

const userCtrl = require('./controllers/user_controller')
const calendarCtrl = require('./controllers/calender_controller')
const { SESSION_SECRET, DATABASE_URL } = process.env

app.use(json())
app.use(cors())

massive(DATABASE_URL)
  .then(db => app.set('db', db))
  .catch(err => console.log('MASSIVE ERROR: ', err))

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
)

app.post('/api/login_user', userCtrl.loginUser)
app.get('/api/get_events', calendarCtrl.getEvents)
app.post('/api/add_event', calendarCtrl.addEvent)
app.get('/api/get_categories', calendarCtrl.getCategories)

app.listen(PORT, () =>
  console.log(`Listening on port ${PORT || 'Port Not Defined'}!`)
)
