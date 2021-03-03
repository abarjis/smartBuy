const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name required'],
        trim: true,
        maxLength: [100, 'Max length is 100 char.']
    },
    description: {
        type: String,
        required: [true, 'Product description required'],
    },
    price: {
        type: Number,
        required: [true, 'Product price requird'],
        maxLength: [5, 'Max length 5 char'],
        default: 0.0
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, 'Product category required'],
        enum: {
            values: [
                'Electronics'
            ],
            message: 'Please select correct category for product'
        }
    },
    seller: {
        type: String,
        required: [true, 'seller required']
    },
    stock: {
        type: Number,
        required: [true, 'Product stock required'],
        maxLength: [5, 'Max length 5 char'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);