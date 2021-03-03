exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    res.status(200).json({
        success: true,
        message: "Show all products"
    })

})