const express = require('express');
const router = express.Router();
const masterDataController = require('../controllers/masterDataController');


router.get('/', masterDataController.getAllData);
router.get('/:table', masterDataController.getAllData);
router.post('/:table', masterDataController.addData);
router.put('/:table/:id', masterDataController.updateData)
router.delete('/:table/:id', masterDataController.deleteData)
module.exports = router;