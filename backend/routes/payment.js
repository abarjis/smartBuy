const express = require('express')
const router = express.Router();

const {
    processPayment,
    sendStripApi
} = require('../controllers/paymentController')

const { isValidUser } = require('../middlewares/userAuth')

router.route('/payment/process').post(isValidUser, processPayment);
router.route('/stripeapi').get(isValidUser, sendStripApi);

module.exports = router;