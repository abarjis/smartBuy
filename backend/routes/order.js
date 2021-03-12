const express = require('express')
const router = express.Router();

const {
    newOrder } = require('../controllers/orderController')

const { isValidUser, validRoles } = require('../middlewares/userAuth')

router.route('/order/new').post(isValidUser, newOrder);


module.exports = router;