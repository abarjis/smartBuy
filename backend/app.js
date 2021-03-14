const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const errorMiddleware = require('./middlewares/errors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')





app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload());



/*
Routes
*/ 
const products = require("./routes/product")
const auth = require('./routes/auth');
const order = require('./routes/order');


app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', order)




/*
Middleware error
*/
app.use(errorMiddleware);




module.exports = app