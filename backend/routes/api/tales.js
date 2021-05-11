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
router.post('/new', (req, res) => {
    const newTale = new Tale({
        name: req.body.name,
        userId: req.body.userId,
        beginning: req.body.beginning,
        middle: req.body.middle,
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
router.delete('/:taleId', verify, (req, res) => {
    Tale.findByIdAndDelete({ _id: req.params.taleId })
        .then(tale => res.json(tale))
        .catch(err => res.status(404).json(err))
});

// edit a tale
router.patch('/:taleId', verify, (req, res) => {
    Tale.findByIdAndUpdate({ _id: req.params.taleId }, { $set: req.body }, { new: true, useFindAndModify: false })
        .then(tale => res.json({ _id: req.params.taleId }))
        .catch(err => res.status(404).json(err))
});

module.exports = router;