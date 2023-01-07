const express = require('express');
const requireAuth = require('../middleware/requireAuth')

const {
    getEntries,
    createEntry
} = require('../controllers/entryController');



const router = express.Router();

router.use(requireAuth)

router.get('/', getEntries);

router.post('/', createEntry);

module.exports = router;