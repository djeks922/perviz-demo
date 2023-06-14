const express = require('express');
const router = express.Router();

const { makePaymentController } = require('../controllers/paymentController');

router.post('/payment', makePaymentController);

module.exports = router;