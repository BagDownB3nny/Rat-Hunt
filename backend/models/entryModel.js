const mongoose = require('mongoose');
const Rat = require('./ratModel');


const Schema = mongoose.Schema;

const entrySchema = new Schema({
    rat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rat',
        required: true
    },
    time: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Entry', entrySchema);
