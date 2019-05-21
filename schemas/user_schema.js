
const mongoose = require('mongoose');
const pbkdf2 = require('pbkdf2');

const Cart = {
    souls: Array, // Array of souls currently in the Cart
    totalValue: Number // The total value of the cart. The Sum of all prices of souls kept in the Cart
}

const UserSchema = new mongoose.Schema({
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
    zipcode : String,
    cart: Cart,
    favourites: Array  
})

UserSchema.pre('save', function (next) {
    this.password = pbkdf2.pbkdf2Sync(this.password, 'salt', 1, 32, 'sha512').toString('hex');
    next();
});

UserSchema.statics.findUserForLogin = async function(email) {
    return User.findOne({email: email})
}

UserSchema.methods.isPasswordCorrect = function(password) {
    return this.password === pbkdf2.pbkdf2Sync(password, 'salt', 1, 32, 'sha512').toString('hex');
}

UserSchema.statics.createAndSaveUser = async function(user) {
    return user.save()
}

UserSchema.statics.findUserByEmail = async function(email) {
    return User.findOne({email: email},{password: false})
}

UserSchema.statics.updateUser = async function(user) {
    return User.findOneAndUpdate({email: user.email}, user, {upsert : true})
}


const User = mongoose.model("User", UserSchema)

module.exports = User