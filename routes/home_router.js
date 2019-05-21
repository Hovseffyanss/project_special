const express = require('express')
const homeRouter = express.Router()




const path = process.cwd();

const UserModel = require(`${path}/models/user_model.js`)
const SoulModel = require(`${path}/models/soul_model.js`)


homeRouter.use(express.json())
homeRouter.use(express.urlencoded({extended: true}))

homeRouter.get("/get-user", async (req, res, next) => {

    console.log(req.session.user)
    
    res.send(req.session.user)

})

homeRouter.get("/get-souls", async (req, res, next) => {
    console.log("/get-souls")
    try {
        const souls = await SoulModel.getSoulsForHome()
        console.log(souls)
        res.send(souls)
    } catch (err) {
        console.log(err)
        next(err)
    }
})

homeRouter.get("/get-souls-by-type", async (req, res, next) => {
    console.log("/get-souls-by-type")
    const type = req.query.soulType
    try {
        const souls = await SoulModel.getSoulByType(type)
        res.send(souls)
    } catch (err) {
        console.log(err)
        next(err)
    }
})

homeRouter.get("/get-soul", async (req, res, next) => {
    console.log("/get-soul")
    const story = req.query.story
    try {
        const soul = await SoulModel.getSoulByStory(story)
        res.send(soul)
    } catch (err) {
        console.log(err)
        next(err)
    }
})


module.exports = homeRouter