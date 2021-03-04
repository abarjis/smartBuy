const Product = require('../models/product')
const ErrorHandler = require('../helpers/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');



/*
  create a new product
 */
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    try {
    const product = await Product.create(req.body);
     
     res.status(201).json({
     success: true,
     product
    })
     
     } catch(error) {
         console.log(error);
       }
    })

/*
Return all products 
*/

exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    try {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
} catch(error) {
    console.log(error);
  }

})

/*
Return a single product!
 */

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    try {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        product
    })
} catch(error) {
    console.log(error);
  }

})

/*
Edit product
*/
exports.editProduct = catchAsyncErrors(async (req, res, next) => {
    try {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    
        res.status(200).json({
            success: true,
            product
        })
    } catch(error) {
        console.log(error);
      }
    })
        

/*
Delete product
*/

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    try{
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }


    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Product is deleted.'
    })
} catch(error) {
    console.log(error);
  }

})
