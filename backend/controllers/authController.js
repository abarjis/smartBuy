const User = require('../models/user');
const ErrorHandler = require('../helpers/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


/*
Sign up user */
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

    const token = user.getJwtToken();
    res.status(201).json({
        success: true,
        token
    })
})


/*
Login User    
 */
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    const token = user.getJwtToken();
    res.status(201).json({
        success: true,
        token
})
})