const ErrorHandler = require('../helpers/errorHandler');


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
    res.status(err.statusCode).json({
        success: false,
        error: err,
        errMessage: err.message,
        stack: err.stack
    })
}

if (process.env.NODE_ENV === 'PRODUCTION') {
    let error = { ...err }
    error.message = err.message;


/*
    Mongoose Object ID Error
*/ 
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`
        error = new ErrorHandler(message, 400)
        }

/*
    Mongoose Validation Error
*/
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message);
        error = new ErrorHandler(message, 400)
    }

    res.status(error.statusCode).json({
        success: false,
        message: error.message || 'Internal Server Error'
    })
    
/*
    Mongoose Duplicate Error
*/ 
    if (err.code === 11000) {
        const message = `Duplicated ${Object.keys(err.keyValue)}`
        error = new ErrorHandler(message, 400)
        }

/*
     Invalid JWT error
*/
    if (err.name === 'JsonWebTokenError') {
        const message = 'JSON Web Token is invalid. Try Again!'
        error = new ErrorHandler(message, 400)
        }
/*
    Expired JWT error
*/
    if (err.name === 'TokenExpiredError') {
        const message = 'JSON Web Token is expired. Try Again!'
        error = new ErrorHandler(message, 400)
        }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Internal Server Error'
        })  
}

}

