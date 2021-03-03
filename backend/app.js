const express = require('express');
const app = express();

const dotenv = require('dotenv');


// All routes
const products = require("./routes/product")

app.use(api/v1, products)

module.exports = app