// Create your expressjs server here.
const express = require('express')
const app = express()

const path = process.cwd();
const router = require(`${path}/routes/router.js`);
const env = 3000
const endPoint = '/'

app.use(express.json())
app.use(endPoint, router);

app.use(function (err, req, res, next) {
  if(err.errorCode != -1) {
    res.status(err.errorCode).send(err.message).end()
  }
  // If the error is not known
  console.error(err.stack)
  res.status(500).end();
})

app.listen(env, () => {console.log(`Port ${env} Loud and Clear!`)})
