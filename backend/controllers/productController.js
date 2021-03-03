const Product = require('../models/product')



/**
 * create a new product
 */
exports.newProduct = async (req, res, next) => {
    try {
    const product = await Product.create(req.body);
     
     res.status(201).json({
     success: true,
     product
    })
     
     } catch(error) {
         console.log(error);
       }
    }

/*
Return all products */

exports.getProducts = async (req, res, next) => {
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

}

/*
Return a single product! */

exports.getSingleProduct = async (req, res, next) => {
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

}