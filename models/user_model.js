const path = process.cwd();
const UserSchemas = require(`${path}/schemas/user_schema.js`);
const Errors = require(`${path}/errors/errors.js`)

/**
 * USER AUTHENTICATION
 */

async function login(username, password) {
    const result = await UserSchemas.findUserForLogin(username)
    if (!result) {
        throw new Errors.UserNotFound()
    }
    if(!result.isPasswordCorrect(password)) {
        throw new Errors.PasswordIncorrect()
    }
    return result
}

async function getUser(username) {
    const result = await UserSchemas.findUserByUserName(username)
    if (!result) {
        throw new Errors.UserNotFound()
    }
    return result
}

async function createUser(user) {
    try {
        await UserSchemas.createAndSaveUser(user)
    } catch (err) {
        console.log(err.message)
        if(err.message === 'User validation failed: username: Username must be longer than 4 characters') {
            throw new Errors.ValidationError()
        }
        throw new Errors.UserAlreadyExists()
    }
}

/**
 * SOUL INTERACTION
 */

 async function addToCart(user, soul) {

    const alreadyAdded = user.cart.souls.filter(function(subjectSoul){ return subjectSoul.story === soul.story })

    if (alreadyAdded) {
        console.log("Already added")
    }

     user.cart.souls.push(soul)

     await UserSchemas.updateUser(user)

     const result = await UserSchemas.findUserByEmail(user.email)

     console.log(result.cart)

 }

async function addToFavourites(user, soul) {
    user.favourites.push(soul)

    await UserSchemas.updateUser(user)

    const result = await UserSchemas.findUserByEmail(user.email)

    console.log(result.favourites)

}

 async function purchaseSoul(user, soul) {

}

module.exports = {
    login,
    getUser,
    addToCart,
    addToFavourites,
    createUser
}
