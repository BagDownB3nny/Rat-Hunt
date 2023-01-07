const Entry = require('../models/entryModel');
const Rat = require('../models/ratModel');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

const getUserId = (req) => {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(401).json({error: 'Authorization token required'})
    }
  
    const token = authorization.split(' ')[1]
    const { _id } = jwt.verify(token, process.env.SECRET)
    return _id
}

// get all workouts
const getEntries = async (req, res) => {
    const _id = getUserId(req)
    const entries = await Entry.find({ hunter: _id}).sort({createdAt: -1}).limit(10);

    const findRat = async (ratName) => {
        const rat = await Rat.find({name:ratName})
        return rat[0]
    }

    const createSentEntry = async (entry) => {
        const rat = await findRat(entry.rat)
        const sentEntry = {
            _id:entry._id,
            rat:rat,
            currentDate:entry.currentDate
        }
        return sentEntry
    }   
    const sentEntriesPromises = entries.map(entry => createSentEntry(entry))
    const sentEntries = await Promise.all(sentEntriesPromises)
    console.log(sentEntries)
    res.status(200).json(sentEntries);
}

// create a new workout 
const createEntry = async (req, res) => {

    // create entry { hunterId, ratName, currentDate }
    const currentDate = new Date()
    const numOfRats = await Rat.count()
    const randomEncounter = Math.floor(Math.random() * (numOfRats))
    const rat = await Rat.find().limit(1).skip(randomEncounter)
    const ratName = rat[0].name
    const userId = getUserId(req)

    const entry = await Entry.create({ hunter: userId, rat: ratName, currentDate })

    // create object { ratObject, currentDate }
    const sentEntry = { id:entry._id, rat: rat[0], currentDate: currentDate }
    console.log(sentEntry)


    // send object as JSON
    res.status(200).json(sentEntry)


    
    
    
    // try {
    //     const entry = await Entry.create( { userId, ratName, currentDate} )
    //     res.status(200).json(entry)
    // } catch (e) {
    //     console.log(e)
    // }
}

module.exports = {
    getEntries,
    createEntry
};