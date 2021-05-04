const express = require('express');
const router = express.Router();

const Character = require('../../models/character');
const verify = require('../verify');

// get all characters
router.get('/', (req, res) => {
    Character.find()
        .then(characters => res.json(characters))
        .catch(err => res.status(404).json(err))
});

// create a character
router.post('/new', (req, res) => {
    const newCharacter = new Character({
        name: req.body.name,
        bio: req.body.bio,
        userId: req.body.userId,
        age: req.body.age,
        gender: req.body.gender,
        height: req.body.height,
        bodyType: req.body.bodyType,
        hairColor: req.body.hairColor,
        race: req.body.race,
        personality: req.body.personality,
        motivation: req.body.motivation,
        posture: req.body.posture,
        facialHair: req.body.facialHair,
        eyes: req.body.eyes,
        behavior: req.body.behavior,
        dailyLife: req.body.dailyLife,
        quirks: req.body.quirks,
        fatalFlaw: req.body.fatalFlaw,
        talents: req.body.talents,
        skills: req.body.skills,
        occupation: req.body.occupation,
        hobbies: req.body.hobbies,
        wounds: req.body.wounds,
        fearOne: req.body.fearOne,
        fearTwo: req.body.fearTwo,
        fearThree: req.body.fearThree,
        fearFour: req.body.fearFour,
        fearFive: req.body.fearFive,
        fearSix: req.body.fearSix,
        positiveTraits: req.body.positiveTraits,
        negativeTraits: req.body.negativeTraits,
        idle: req.body.idle,
        stressed: req.body.stressed,
        exhausted: req.body.exhausted,
        inebriated: req.body.inebriated,
        anxious: req.body.anxious,
        distracted: req.body.distracted,
        attraction: req.body.attraction,
        aroused: req.body.aroused,
        anger: req.body.anger,
        provoke: req.body.provoke,
        overreact: req.body.overreact,
        denial: req.body.denial,
        negCoping: req.body.negCoping,
        posCoping: req.body.posCoping,
        outerMot: req.body.outerMot,
        innerMotGen: req.body.innerMotGen,
        innerMotSpec: req.body.innerMotSpec
    })

    newCharacter.save().then(character => res.json(character))
        .catch(err => res.status(404).json(err))
    // newCharacter.save(err => {
    //     if (err) return res.json(err);
    //     User.findOne({ _id: req.session._id }, function (user, err) {
    //         if (!user || err) return res.json('Login required.');
    //         user.characters.push(newCharacter._id);
    //         user.save(err => {
    //             if (err) return res.json(err);
    //             return res.json(newCharacter);
    //         })
    //     })
    // })
});

// view one character
router.get('/:character_id', (req, res) => {
    const character = Character.findById({ _id: req.params.character_id })
        .then(character => res.json(character))
        .catch(err => res.status(404).json(err))
})

// delete a character
router.delete('/:character_id', verify, (req, res) => {
    Character.findOneAndDelete({ _id: req.params.character_id })
        .then(character => res.json(character))
        .catch(err => res.status(404).json(err))
});

// edit a character
router.patch('/:character_id', verify, (req, res) => {
    Character.findOneAndUpdate({ _id: req.params.character_id }, { $set: req.body }, { new: true, useFindAndModify: false })
        .then(character => res.json({ _id: req.params.character_id }))
        .catch(err => res.status(404).json(err))
});

module.exports = router;