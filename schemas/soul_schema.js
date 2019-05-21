const mongoose = require('mongoose');

const SoulType = {
    Sinful: "Sinful Soul",
    Mediocre: "Mediocre Soul",
    Saint: "Saint Soul"
}

const SoulSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    price: Number,
    story: {
        type: String,
        unique: true
    },
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

SoulSchema.statics.getSoulByStory = async function(story) {
    return Soul.findOne({story: story})
}

SoulSchema.statics.deleteSoul = async function(soul) {
    return Soul.deleteOne(soul)
}

const Soul = mongoose.model("Soul", SoulSchema)

module.exports = {
    Soul,
    SoulType
}