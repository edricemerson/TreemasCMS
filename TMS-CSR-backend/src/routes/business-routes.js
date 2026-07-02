const express = require('express');
const router = express.Router();
const businessProfileController = require('../controllers/businessController');

// URL jadinya: POST http://localhost:3000/api/profile/submit
router.post('/submit', businessProfileController.submitProfile);

module.exports = router;