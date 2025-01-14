const express = require('express');
const router = express.Router();
const validateClick = require('../controllers/validateController');

router.post('/', validateClick);

module.exports = router;