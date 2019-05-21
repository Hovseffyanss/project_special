// Create your expressjs server here.
const express = require('express')
const app = express()

const session = require('express-session')

const path = process.cwd();
// Define server routers
const authRouter = require(`${path}/routes/auth_router.js`)
const homeRouter = require(`${path}/routes/home_router.js`)
const userRouter = require(`${path}/routes/user_router.js`)

const env = 3001

app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  }
}))

app.use(express.static(path))

app.use(`/`, authRouter)
app.use(`/home-page`, homeRouter)
app.use(`/user-profile`, userRouter)

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(function (err, req, res, next) {

  if(err.errorCode != -1) {

    res.status(err.errorCode).send(err.message).end()
    
  }
  // If the error is not known
  console.error(err.stack)
  res.status(500).end();
})

app.listen(env, () => {console.log(`Port ${env} Loud and Clear!`)})
