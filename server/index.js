require('dotenv').config()
const express = require('express')
const massive = require('massive')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser')
const cors = require('cors')
const PORT = 3001

const app = express()

const userCtrl = require('./controllers/user_controller')
const calendarCtrl = require('./controllers/calender_controller')
const { DATABASE_URL } = process.env

// MIDDLEWARE
app.use(json())
app.use(cors())
app.use(cookieParser());

// Decode the JWT to get the user_identifier on each request
app.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const user_identifier = jwt.verify(token, process.env.APP_SECRET)
    // set the user_identifier on each request for easy access
    req.user_identifier = user_identifier;
  }
  next();
});

massive(DATABASE_URL)
  .then(db => app.set('db', db))
  .catch(err => console.log('MASSIVE ERROR: ', err))

app.post('/api/create_user', userCtrl.createUser)
app.post('/api/login_user', userCtrl.loginUser)
app.get('/api/get_events', calendarCtrl.getEvents)
app.post('/api/add_event', calendarCtrl.addEvent)
app.get('/api/get_categories', calendarCtrl.getCategories)

app.listen(PORT, () =>
  console.log(`Listening on port ${PORT || 'Port Not Defined'}!`)
)
