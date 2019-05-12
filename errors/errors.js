
class ExpressError extends Error {
    constructor(message, errorCode) {
        super(message);
        this.errorCode = errorCode
      }
}

class UserNotFound extends ExpressError {
    constructor(){
        super("User has not been found", 404)
    }
}

class UserAlreadyExists extends ExpressError {
    constructor(){
        super("User already exists", 409)
    }
}

class PasswordIncorrect extends ExpressError {
    constructor(){
        super("Entered password is incorrect", 401)
    }
}

class ValidationError extends ExpressError {
    constructor(){
        super('Username must be longer than 4 characters', 400)
    }
}

class UserIsLocked extends ExpressError {
    constructor(){
        super("User is locked", 423)
    }
}

module.exports = {
    UserNotFound,
    UserAlreadyExists,
    PasswordIncorrect,
    ValidationError, // Username is shorter than 4 characters
    UserIsLocked // BONUS
}
