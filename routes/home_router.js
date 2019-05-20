const express = require('express')
const homeRouter = express.Router()




const path = process.cwd();

const UserModel = require(`${path}/models/user_model.js`)


homeRouter.use(express.json())
homeRouter.use(express.urlencoded({extended: true}))

homeRouter.get("/user", async (req, res, next) => {

    console.log(req.session.user)
    
    res.send(req.session.user)

    try {

        // UserModel.addToCart(req.session.user, {
        //     firstname: "Dumbass",
        //     lastname: "Stupidass"
        // })

        // UserModel.addToFavourites(req.session.user, {
        //     firstname: "Yoo",
        //     lastname: "Suupp"
        // })

    } catch (err) {

        console.log(err)
        next(err)
    }




})

homeRouter.get("/souls", async (req, res, next) => {





})


module.exports = homeRouter