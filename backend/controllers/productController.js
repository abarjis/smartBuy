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
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
    }

    res.status(200).json({
        success: true,
        product
    })
} catch(error) {
    console.log(error);
  }

}

/*Edit product*/
exports.editProduct = async (req, res, next) => {
    try {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        })
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
    }
        