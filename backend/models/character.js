const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    userId: {
        type: Number
    },
    personality: {
        type: String
    },
    motivation: {
        type: String
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    bodyType: {
        type: String,
        required: true
    },
    hairColor: {
        type: String,
        required: true
    },
    posture: {
        type: String
    },
    facialHair: {
        type: String
    },
    eyes: {
        type: String
    },
    race: {
        type: String,
        required: true
    },
    behavior: {
        type: String
    },
    dailyLife: {
        type: String
    },
    quirks: {
        type: String
    },
    fatalFlaw: {
        type: String
    },
    talents: {
        type: String
    },
    skills: {
        type: String
    },
    occupation: {
        type: String
    },
    hobbies: {
        type: String
    },
    wounds: {
        type: String
    },
    fearOne: {
        type: String
    },
    fearTwo: {
        type: String
    },
    fearThree: {
        type: String
    },
    fearFour: {
        type: String
    },
    fearFive: {
        type: String
    },
    fearSix: {
        type: String
    },
    positiveTraits: {
        type: String
    },
    negativeTraits: {
        type: String
    },
    idle: {
        type: String
    },
    stressed: {
        type: String
    },
    exhausted: {
        type: String
    },
    inebriated: {
        type: String
    },
    anxious: {
        type: String
    },
    distracted: {
        type: String
    },
    attraction: {
        type: String
    },
    aroused: {
        type: String
    },
    anger: {
        type: String
    },
    provoke: {
        type: String
    },
    overreact: {
        type: String
    },
    denial: {
        type: String
    },
    negCoping: {
        type: String
    },
    posCoping: {
        type: String
    },
    outerMot: {
        type: String
    },
    innerMotGen: {
        type: String
    },
    innerMotSpec: {
        type: String
    },
}, {
    timestamps: true,
});

module.exports = Character = mongoose.model('Character', CharacterSchema);