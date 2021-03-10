const express = require('express')
const router = express.Router();

const { isValidUser, validRoles } = require('../middlewares/userAuth');
const { getProducts, newProduct, getSingleProduct, editProduct, deleteProduct } = require('../controllers/productController')


router.route('/products').get(isValidUser, validRoles('admin'),getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/new').post(isValidUser, newProduct);

router.route('/admin/product/:id')
                                .put(isValidUser, editProduct)
                                .delete(isValidUser, deleteProduct)



module.exports = router;