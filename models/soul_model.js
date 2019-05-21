const path = process.cwd();
const SoulSchema = require(`${path}/schemas/soul_schema.js`)
const Soul = SoulSchema.Soul

const soulType = SoulSchema.SoulType
const Errors = require(`${path}/errors/errors.js`)


async function addSoulToDB() {
    const result = await Soul.getAllSouls()
    if (result.length != 0) {
        console.log(result.length)
        return
    }
    try {
        for(i = 0; i < soulArray.length; i++) {
            const soul = new Soul(soulArray[i])
            await Soul.createAndSaveSoul(soul)
        }
        console.log("Souls have been saved to the database")

    } catch(err) {
        console.log(err)
    }
}


async function deleteAllSouls() {
    try {
        for(i = 0; i < soulArray.length; i++) {
            const soul = new Soul(soulArray[i])
            await Soul.deleteSoul(soul)
        }
        console.log("Souls have been saved to the database")

} catch(err) {
    console.log(err)
}
}


async function getSoulsForHome() {
    // await deleteAllSouls()
    await addSoulToDB()
    return await Soul.getAllSouls()
}

async function getSoulByStory(story) {
    return await Soul.getSoulByStory(story)
}

async function getNewArrivals(soulType) {
    return await Soul.getSoulsBySoulType(soulType)
}

const soulArray = [
    {
        firstname: "Jane",
        lastname: "Doe",
        soulType: soulType.Saint,
        story: "Suffers from a cliche name",
        price: 460
    },
    {
        firstname: "Jon",
        lastname: "Doe",
        soulType: soulType.Saint,
        story: "Alcohol addict",
        price: 678

    },
    {
        firstname: "July",
        lastname: "Dooley",
        soulType: soulType.Saint,
        story: "A successful shop clerk",
        price: 321
    },
    {
        firstname: "Vlad",
        lastname: "The Impaler",
        soulType: soulType.Sinful,
        story: "It's in the name",
        price: 116
    },
    {
        firstname: "Adolph",
        lastname: "Hitler",
        soulType: soulType.Sinful,
        story: "A fashion influencer",
        price: 342
    },
    {
        firstname: "Napoleon",
        lastname: "Dynamite",
        soulType: soulType.Mediocre,
        story: "No idea, I got lazy",
        price: 123
    },
    {
        firstname: "Maximilien",
        lastname: "Robespierre",
        soulType: soulType.Sinful,
        story: "Worst kind of revolutionary",
        price: 300
    },
    {
        firstname: "Genghis",
        lastname: "Khan",
        soulType: soulType.Mediocre,
        story: "A no good warlord",
        price: 700
    },
    {
        firstname: "Caligula",
        lastname: "",
        soulType: soulType.Sinful,
        story: "This guy's super weird",
        price: 465

    },
    {
        firstname: "Emperor",
        lastname: "Nero",
        soulType: soulType.Sinful,
        story: "this guy just sucks",
        price: 321
    },
    {
        firstname: "Jon",
        lastname: "Snow",
        soulType: soulType.Mediocre,
        story: "Knows nothing",
        price: 35
    },
    {
        firstname: "Uncle",
        lastname: "Bob",
        soulType: soulType.Sinful,
        story: "Is substatially dead",
        price: 666
    }
]

module.exports = { 
    addSoulToDB,
    getSoulsForHome,
    getSoulByStory
}
