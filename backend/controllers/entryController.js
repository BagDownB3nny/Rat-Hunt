const Entry = require('../models/entryModel');
const Rat = require('../models/ratModel');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

// get all workouts
const getEntries = async (req, res) => {
    const { _id } = jwt.verify(token, process.env.SECRET)
    const entries = await Entry.find({ id: _id}).sort({createdAt: -1}).limit(10);
    res.status(200).json(entries);
}

// create a new workout 
const createEntry = async (req, res) => {
    const currentDate = new Date()
    const numOfRats = await Rat.count()
    const randomEncounter = Math.floor(Math.random() * (numOfRats))
    const rat = await Rat.find().limit(1).skip(randomEncounter)
    res.status(200).json(rat[0])
}

module.exports = {
    getEntries,
    createEntry
};