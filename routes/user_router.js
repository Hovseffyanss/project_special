const express = require("express")
const userRouter = express.Router()



const path = process.cwd()
const UserModel = require(`${path}/models/user_model.js`)
const Errors = require(`${path}/errors/errors.js`)

userRouter.use(express.json())
userRouter.use(express.urlencoded({extended: true}))
  
userRouter.get("/get-user-info", async (req, res, next) => {
    
    const user = req.session.user

    if (!user) {
        throw new Errors.UserSessionEnded()
    }
    res.send(req.session.user)
})

userRouter.get("/get-cart", async (req, res, next) => {
    const user = req.session.user
    if (!user) {
        throw new Errors.UserSessionEnded()
    }
    res.send(req.session.user.cart)
})

userRouter.post("/add-to-cart", async (req, res, next) => {
    const soul = req.body
    const user = req.session.user

    if (!user) {
        throw new Errors.UserSessionEnded()
    }

    try {
        await UserModel.addToCart(req.session.user, soul)
        res.send(req.session.user.cart)
    } catch(err) {
        console.log(err)
        next(err)
    }
})

module.exports = userRouter