
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
        super("Entered password is incorrect", 402)
    }
}

class SoulAlreadyAdded extends ExpressError {
    constructor(){
        super("This soul has already been added", 403)
    }
}

class UserSessionEnded extends ExpressError {
    constructor(){
        super("User session ended", 401)
    }
}

module.exports = {
    UserNotFound,
    UserAlreadyExists,
    PasswordIncorrect,
    SoulAlreadyAdded,
    UserSessionEnded
}
