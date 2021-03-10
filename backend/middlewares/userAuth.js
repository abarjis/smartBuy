const User = require('../models/user')

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../helpers/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

/*
Checks if valid user.
*/ 
exports.isValidUser = catchAsyncErrors(async (req, res, next) => {

    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler('Login first to access this resource.', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()
})

/*
Valid roles: user or admin
*/
exports.validRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allowed to acccess this resource`, 403))
        }
        next()
    }
}