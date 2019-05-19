const mongoose = require('mongoose');
const pbkdf2 = require('pbkdf2');

const DeadlySin = {
    PRIDE: "PRIDE",
    ENVY: "ENVY",
    GLUTTONY: "GLUTTONY",
    LUST: "LUST",
    ANGER: "ANGER",
    GREED: "GREED",
    SLOTH: "SLOTH"
}

const SoulSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    price: String,
    dominantSin: DeadlySin 
})

/**
 * TODO 
 */

SoulSchema.pre('save', function (next) {
    this.password = pbkdf2.pbkdf2Sync(this.password, 'salt', 1, 32, 'sha512').toString('hex');
    next();
});

SoulSchema.statics.findUserForLogin = async function(username) {
    return User.findOne({username: username})
}

SoulSchema.methods.isPasswordCorrect = function(password) {
    return this.password === pbkdf2.pbkdf2Sync(password, 'salt', 1, 32, 'sha512').toString('hex');
}

UserSchema.statics.createAndSaveUser = async function(user) {
    return user.save()
}

UserSchema.statics.findAllUsers = async function() {
    return User.find().select('username email firstname lastname')
}

UserSchema.statics.findUserByUserName = async function(username) {
    return User.findOne({username: username},{password: false})
}

const User = mongoose.model("User", UserSchema)

module.exports = User