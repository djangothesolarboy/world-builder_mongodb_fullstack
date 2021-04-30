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
router.post('/', verify, (req, res) => {
    const newCharacter = new Character({
        name: req.body.name,
        bio: req.body.bio,
        age: req.body.age,
        gender: req.body.gender,
        height: req.body.height,
        bodyType: req.body.bodyType,
        hairColor: req.body.hairColor,
        race: req.body.race
    })

    newCharacter.save().then(character => res.json(character))
        .catch(err => res.status(404).json(err))
});

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