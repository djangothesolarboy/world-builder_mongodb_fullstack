const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const UserSchema = Schema({
    username: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    characters: [ObjectId],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('User', UserSchema);