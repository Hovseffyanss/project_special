const express = require('express')
const homeRouter = express.Router()


const path = process.cwd();
homeRouter.use(express.json())
homeRouter.use(express.urlencoded({extended: true}))

homeRouter.get("/", async (req, res, next) => {

    // const user = req.query

    // if (user) {
    //     alert(`Welcome ` + user.email)

    //     currentUser = user

    //     console.log(user)
    //     res.sendStatus(200)
    // }
    console.log( req.session.user)
    
    res.send(req.session.user)


})


module.exports = homeRouter