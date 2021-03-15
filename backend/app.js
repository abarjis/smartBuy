const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const errorMiddleware = require('./middlewares/errors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path')





dotenv.config({ path: 'backend/config.env' })

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
const payment = require('./routes/payment');



app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', order)
app.use('/api/v1', payment)


if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}




/*
Middleware error
*/
app.use(errorMiddleware);




module.exports = app