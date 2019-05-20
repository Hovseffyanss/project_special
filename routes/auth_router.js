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
        const result = userModel.createUser(user)

        req.session.user = result
        console.log("SUCCESS")
        res.send(200)
    } catch(err) {
        next(err)
    }
  })






  /**
   * Home Page
   */

  router.get("/home_page.html", async (req, res, next) => {
    //   res.sendFile("home_page.html", {root: path})
    // res.send("YEY")
    
    res.sendFile("home_page.html", {root: path})
  })





router.post('/users/', async (req, res, next) => {

    const body = req.body
    const user = new UserSchema({
        username: body.username,
        email: body.email,
        firstname: body.firstname,
        lastname: body.lastname,
        password: body.password
    })

    try {
        const result = await UserModels.createUser(user)
        res.status(201).send(`User has been successfuly saved`)
    } catch (err) {
        next(err)
    }

})


/**
 * REFERENCES!JHAKSFHKAJSHDFLAJSHFLDHLKAJSHFLKAS
 * 
 */


router.post('/login', async (req, res, next) => {
    const body = req.body
    const username = body.username
    const password = body.password
    try {
        const result = await UserModels.login(username, password)
        res.status(200).send(`You have been successfully authenticated as ${result.username}`)
    } catch (err) {
        next(err)
    }
})

router.get("/users/", async (req, res, next) => {
    // try {
    //     const result = await UserModels.getAllUsers()
    //     res.json(result)
    // } catch (err) {
    //     next(err)
    // }

})

router.get('/users/:username', async (req, res, next) => {
    const username = req.params.username
    try {
        const result = await UserModels.getUser(username)
        res.json(result)
    } catch(err) {
        next(err)
    }
})

module.exports = router