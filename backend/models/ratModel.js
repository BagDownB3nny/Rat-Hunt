const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ratSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    power: {
        type: Number,
        required: true
    },
    gold: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Rat', ratSchema);