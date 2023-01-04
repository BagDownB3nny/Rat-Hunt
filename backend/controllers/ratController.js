const Rat = require('../models/ratModel');
const mongoose = require('mongoose');

// get all workouts
const getRats = async (req, res) => {
    const rats = await Rat.find({}).sort({createdAt: -1});
    res.status(200).json(rats);
}

// get a single workout
const getRat = async (req,res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such rat'});
    }

    const rat = await Rat.findById(id);

    if (!rat) {
        return res.status(404).json({error: 'No such rat'});
    }
    res.status(200).json(rat);
}

// create a new workout 
const createRat = async (req, res) => {
    const {name, power, gold, description} = req.body;

    // add doc to db
    try {
        const rat = await Rat.create( {name, power, gold, description} );
        res.status(200).json(rat);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

// delete a rat
const deleteRat = async (req, res) => {
    console.log("DELETING RAT")
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("no such rat1")
        return res.status(400).json({error: 'No such rat'});
    }

    const rat = await Rat.findOneAndDelete({_id: id});

    if (!rat) {
        console.log("no such rat2")
        return res.status(404).json({error: 'No such rat'});
    } 
    res.status(200).json(rat);
    console.log("DELETED RAT")
}

// update a rat
const updateRat = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such rat'});
    }

    const rat = await Rat.findOneAndUpdate({_id: id}, 
        {...req.body}
    );

    if (!rat) {
        return res.status(404).json({error: 'No such rat'});
    } 
    res.status(200).json(rat);
}

module.exports = {
    getRats,
    getRat,
    createRat,
    deleteRat,
    updateRat
};