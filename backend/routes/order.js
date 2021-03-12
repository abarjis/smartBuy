const express = require('express')
const router = express.Router();

const {
    newOrder,
    singleOrder,
    myOrders } = require('../controllers/orderController')

const { isValidUser, validRoles } = require('../middlewares/userAuth')

router.route('/order/new').post(isValidUser, newOrder);

router.route('/order/:id').get(isValidUser, singleOrder);
router.route('/orders/myorders').get(isValidUser, myOrders);


module.exports = router;