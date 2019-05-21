const express = require('express')
const homeRouter = express.Router()

const path = process.cwd();

const Errors = require(`${path}/errors/errors.js`)
const SoulModel = require(`${path}/models/soul_model.js`)


homeRouter.use(express.json())
homeRouter.use(express.urlencoded({extended: true}))

homeRouter.get("/get-user", async (req, res, next) => {

    const user = req.session.user
    try {
        if (!user) {
            throw new Errors.UserSessionEnded()
        }
        res.send(req.session.user)    

    } catch(err) {
        next(err)
    }

})

homeRouter.get("/get-souls", async (req, res, next) => {
    console.log("/get-souls")
    try {
        const souls = await SoulModel.getSoulsForHome()
        res.send(souls)
    } catch (err) {
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