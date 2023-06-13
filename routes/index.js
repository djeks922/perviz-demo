const express = require('express');
const router = express.Router();

const { paymentController } = require('../controllers');

router.get('/payment', paymentController);

module.exports = router;