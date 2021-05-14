const express = require('express');
const router = express.Router();

const Tale = require('../../models/tale');
const verify = require('../verify');

// get all tales
router.get('/', (req, res) => {
    Tale.find()
        .then(tales => res.json(tales))
        .catch(err => res.status(404).json(err))
});

// create new tale
router.post('/new', verify, (req, res) => {
    const newTale = new Tale({
        name: req.body.name,
        userId: req.body.userId,
        beginning: req.body.beginning,
        event: req.body.event,
        middle: req.body.middle,
        climax: req.body.climax,
        end: req.body.end,
        briefDesc: req.body.briefDesc,
        taleSpine: req.body.taleSpine,
        taleType: req.body.taleType,
        purpose: req.body.purpose,
        listChar: req.body.listChar,
        theTale: req.body.theTale
    })

    newTale.save().then(tale => res.json(tale))
        .catch(err => res.status(404).json(err))
});

// view one tale by id
router.get('/:taleId', (req, res) => {
    const tale = Tale.findById({ _id: req.params.taleId })
        .then(tale => res.json(tale))
        .catch(err => res.status(404).json(err))
});

// delete a tale
router.delete('/delete', verify, (req, res) => {
    Tale.deleteOne({ _id: req.query._id })
        .then(tale => res.json(tale))
        .catch(err => res.status(404).json(err))
});

// edit a tale
router.patch('/edit', verify, (req, res) => {
    return Tale.updateOne({ _id: req.query._id }, { 
        "$set": {
            name: req.body.name,
            beginning: req.body.beginning,
            event: req.body.event,
            middle: req.body.middle,
            climax: req.body.climax,
            end: req.body.end,
            briefDesc: req.body.briefDesc,
            taleSpine: req.body.taleSpine,
            taleType: req.body.taleType,
            purpose: req.body.purpose,
            listChar: req.body.listChar,
            theTale: req.body.theTale
        }})
        .then(tale => res.json(tale))
        .catch(err => res.status(404).json({ message: err }))
});

module.exports = router;