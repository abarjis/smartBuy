const Product = require('../models/product')
const ErrorHandler = require('../helpers/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Helpers = require('../helpers/helpers')


/*
  create a new product
 */
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    try {

    req.body.user = req.user.id;
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

    const resPerPage = 4;
    const productsCount = await Product.countDocuments();
    const helpers = new Helpers(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)
    
    let products = await helpers.query;

    res.status(200).json({
        success: true,
        count: products.length,
        productsCount,
        resPerPage,
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


/*
Create a new review
*/ 
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

})

/*
Return product reviews
*/
exports.productReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

/*
Remove Product Review
 */ 
exports.removeReview = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    console.log(product);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})