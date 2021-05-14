const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const UserSchema = require('./user');

const TaleSchema = Schema({
    name: {
        type: String,
        required: true
    },
    userId: ObjectId,
    beginning: {
        type: String,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    middle: {
        type: String,
        required: true
    },
    climax: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    briefDesc: {
        type: String,
        required: true
    },
    taleSpine: {
        type: String
    },
    taleType: {
        type: String
    },
    purpose: {
        type: String
    },
    charList: {
        type: String
    },
    theTale: {
        type: String
    }
}, {
    timestamps: true,
});

module.exports = Tale = mongoose.model('Tale', TaleSchema);