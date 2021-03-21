const express = require('express')
const router = express.Router();

const {
    newOrder,
    singleOrder,
    myOrders,
    allOrders,
    updateOrder,
    removeOrder
 } = require('../controllers/orderController')

const { isValidUser, validRoles } = require('../middlewares/userAuth')

router.route('/order/new').post(isValidUser, newOrder);

router.route('/order/:id').get(isValidUser, singleOrder);
router.route('/orders/myorders').get(isValidUser, myOrders);


router.route('/admin/orders').get(isValidUser, validRoles('admin'), allOrders);
router.route('/admin/order/:id')
            .put(isValidUser, validRoles('admin'), updateOrder)
            .delete(isValidUser, validRoles('admin'), removeOrder)


module.exports = router;