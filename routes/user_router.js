const express = require("express")
const userRouter = express.Router()



const path = process.cwd()

userRouter.use(express.json())
userRouter.use(express.urlencoded({extended: true}))
  
userRouter.get("/", async (req, res, next) => {
    res.send(req.session.user)
})

module.exports = userRouter