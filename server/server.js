// Create your expressjs server here.
const express = require('express')
const app = express()

const path = process.cwd();
const router = require(`${path}/routes/router.js`);
const env = 3001
const endPoint = '/'


app.use(endPoint, router);
app.use(express.json())


app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.use(function (err, req, res, next) {
  req.headers['Content-Type'] = 'application/json'

  if (err.status >= 100 && err.status < 600){
    res.status(err.status);
  } else {
    res.status(500).end();
  }

  // alert(err.message)

  // if(err.errorCode != -1) {
  //   res.status(err.errorCode).send(err.message).end()
  // }
  // // If the error is not known
  // console.log("fuuuuck")
  // console.error(err.stack)
  // res.status(500).end();
})

app.listen(env, () => {console.log(`Port ${env} Loud and Clear!`)})
