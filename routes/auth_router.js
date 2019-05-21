const express = require('express')
const router = express.Router();

const path = process.cwd();
const userSchema = require(`${path}/schemas/user_schema.js`)
const userModel = require(`${path}/models/user_model.js`)


const SoulModel = require(`${path}/models/soul_model.js`)

router.use(express.json())
router.use(express.urlencoded({extended: true}))
  
/**
 * User Authentication
 */

  router.get("/front-page", async (req, res, next) => {
      console.log("GET/front_page.html")
      res.sendFile("front_page.html", {root : path})

      try {
        await SoulModel.addSoulToDB()
      } catch (err) {
        console.log(err)
        next(err)
      }
  })

  router.post("/front-page", async (req, res, next) => {
    console.log("POST/front_page.html")
    console.log(req.body, 'body')
    const email = req.body.email
    const password = req.body.password

    try {
        const loginResult = await userModel.login(email, password)
        console.log(loginResult.email)

        req.session.user = loginResult

        res.send(loginResult)

    } catch (err) {
        console.log("Unable to log in")
        next(err)
    }
  })

  /**
   * User Registration
   */

  router.get("/sign-up", async (req, res, next) => {
      console.log("GET/Sign_up.html")

      res.sendFile("Sign_up.html",  {root : path})
  })

  router.post("/sign-up", async (req, res, next) => {

    console.log("POST/Sign_up.html")
    console.log(req.body)
    try {
        const user = new userSchema(req.body)
        user.cart = {}
        user.cart.totalValue = 0
        const result = userModel.createUser(user)

        req.session.user = result
        console.log("SUCCESS")
        res.send(200)
    } catch(err) {
        next(err)
    }
  })

module.exports = router