
const mongoose = require('mongoose');
const pbkdf2 = require('pbkdf2');


// USER CART
const Cart = {
    souls: Array, // Array of souls currently in the Cart
    totalValue: Number // The total value of the cart. The Sum of all prices of souls kept in the Cart
}

// USER SCHEMA
const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true
    },
    firstname: String,
    lastname: String,
    password : String,
    address : String,
    city : String,
    country : String, 
    cart: Cart
})

/**
 * UTILITY FUNCTIONS
 */

UserSchema.pre('save', function (next) {
    this.password = pbkdf2.pbkdf2Sync(this.password, 'salt', 1, 32, 'sha512').toString('hex');
    next();
});

UserSchema.statics.findUserForLogin = async function(username) {
    return User.findOne({username: username})
}

UserSchema.methods.isPasswordCorrect = function(password) {
    return this.password === pbkdf2.pbkdf2Sync(password, 'salt', 1, 32, 'sha512').toString('hex');
}

UserSchema.statics.createAndSaveUser = async function(user) {
    return user.save()
}

UserSchema.statics.findUserByUserName = async function(username) {
    return User.findOne({username: username},{password: false})
}


UserSchema.statics.updateUser = async function(user) {

}



const User = mongoose.model("User", UserSchema)

module.exports = User