const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const errorMiddleware = require('./middlewares/errors')



app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
Routes
*/ 
const products = require("./routes/product")
const auth = require('./routes/auth');

/*
Middleware error
*/
app.use(errorMiddleware);


app.use('/api/v1', products)
app.use('/api/v1', auth)


module.exports = app