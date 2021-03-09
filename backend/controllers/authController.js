const User = require('../models/user');

const ErrorHandler = require('../helpers/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatar/k4y0gurvv7qlini5oo5q',
            url: 'https://res.cloudinary.com/di2ekyqod/image/upload/v1614699624/avatar/k4y0gurvv7qlini5oo5q.jpg'
        }
    })

    res.status(201).json({
        success: true,
        user
    })

})