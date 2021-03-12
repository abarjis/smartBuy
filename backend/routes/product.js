const express = require('express')
const router = express.Router();

const { isValidUser, validRoles } = require('../middlewares/userAuth');
const { getProducts,
        newProduct,
        getSingleProduct,
        editProduct, 
        deleteProduct,
        createProductReview,
        productReviews } = require('../controllers/productController')


router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/new').post(isValidUser, validRoles('admin'), newProduct);

router.route('/admin/product/:id')
                                .put(isValidUser, validRoles('admin'), editProduct)
                                .delete(isValidUser, validRoles('admin'), deleteProduct)


router.route('/review').put(isValidUser, createProductReview)
router.route('/reviews').get(isValidUser, productReviews)


module.exports = router;