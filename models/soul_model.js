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

async function getNewArrivals() {

}

async function getSoulByDeadlySin(deadlySin) {


}


const soulArray = [
    {
        firstname: "Jane",
        lastname: "Doe",
        soulType: soulType.Saint,
        story: "Suffers from a cliche name"
    },
    {
        firstname: "Jon",
        lastname: "Doe",
        soulType: soulType.Saint,
        story: "Alcohol addict"

    },
    {
        firstname: "July",
        lastname: "Dooley",
        soulType: soulType.Saint,
        story: "A successful shop clerk"
    },
    {
        firstname: "Vlad",
        lastname: "The Impaler",
        soulType: soulType.Sinful,
        story: "It's in the name"
    },
    {
        firstname: "Adolph",
        lastname: "Hitler",
        soulType: soulType.Sinful,
        story: "A fashion influencer"
    },
    {
        firstname: "Napoleon",
        lastname: "Dynamite",
        soulType: soulType.Mediocre,
        story: "No idea, I got lazy"
    },
    {
        firstname: "Maximilien",
        lastname: "Robespierre",
        soulType: soulType.Sinful,
        story: "Worst kind of revolutionary"
    },
    {
        firstname: "Genghis",
        lastname: "Khan",
        soulType: soulType.Mediocre,
        story: "A no good warlord"
    },
    {
        firstname: "Caligula",
        lastname: "",
        soulType: soulType.Sinful,
        story: "This guy's super weird"

    },
    {
        firstname: "Emperor",
        lastname: "Nero",
        soulType: soulType.Sinful,
        story: "this guy just sucks"
    },
    {
        firstname: "Jon",
        lastname: "Snow",
        soulType: soulType.Mediocre,
        story: "Knows nothing"
    },
    {
        firstname: "Uncle",
        lastname: "Bob",
        soulType: soulType.Sinful,
        story: "Is substatially dead"
    }
]

module.exports = { addSoulToDB }
