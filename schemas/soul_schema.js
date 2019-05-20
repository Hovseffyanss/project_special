const mongoose = require('mongoose');

// const DeadlySin = {
//     PRIDE: "PRIDE",
//     ENVY: "ENVY",
//     GLUTTONY: "GLUTTONY",
//     LUST: "LUST",
//     ANGER: "ANGER",
//     GREED: "GREED",
//     SLOTH: "SLOTH"
// }

const SoulType = {
    Sinful: "SINFUL",
    Mediocre: "MEDIOCRE",
    Saint: "SAINT"
}

const SoulSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    price: String,
    story: String,
    // dominantSin: DeadlySin,
    soulType: String 
})

SoulSchema.statics.getAllSouls = async function() {
    return Soul.find()
}

SoulSchema.statics.createAndSaveSoul = async function(soul) {
    return soul.save()
}

SoulSchema.statics.getSoulsBySoulType = async function(soulType) {
    return Soul.find({soulType : soulType})
}

const Soul = mongoose.model("Soul", SoulSchema)

module.exports = {
    Soul,
    SoulType
}