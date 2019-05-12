const express = require('express')
const router = express.Router();

const path = process.cwd();
const UserSchema = require(`${path}/schemas/user_schema.js`)
const UserModels = require(`${path}/models/user_model.js`)

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
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