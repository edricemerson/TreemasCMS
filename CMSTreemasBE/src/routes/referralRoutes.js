const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');


router.get('/', referralController.getAllReferralCodes);
router.post('/', referralController.addReferralCode);

router.post('/validate', referralController.validateReferralCode);
router.get('/validate', referralController.validateReferralCode);

module.exports = router;