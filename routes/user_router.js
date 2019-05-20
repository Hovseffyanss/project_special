const express = require("express")
const userRouter = express.Router()



const path = process.cwd()

userRouter.use(express.json())
userRouter.use(express.urlencoded({extended: true}))
  
userRouter.get("/user", async (req, res, next) => {
    res.send(req.session.user)
})


userRouter.get("/cart", async (req, res, next) => {
    console.log(req.session.user.cart)
    res.send(req.session.user.cart)
})


module.exports = userRouter