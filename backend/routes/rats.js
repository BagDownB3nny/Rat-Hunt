const express = require('express');
const {
    getRats,
    getRat,
    createRat,
    deleteRat,
    updateRat
} = require('../controllers/ratController');

const router = express.Router();

router.get('/', getRats);

router.get('/:id', getRat);

router.post('/', createRat);

router.delete('/:id', deleteRat);

router.patch('/:id', updateRat);

module.exports = router;