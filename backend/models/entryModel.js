const mongoose = require('mongoose');
const Rat = require('./ratModel');


const Schema = mongoose.Schema;

const entrySchema = new Schema({
    hunter: {
        type: String,
        required: true
    },
    rat: {
        type: String,
        required: true
    },
    currentDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Entry', entrySchema);
