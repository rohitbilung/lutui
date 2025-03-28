const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());

const userRoutes = require('./routes/user.route')
const productRoutes = require('./routes/product.route')
const uploadRoutes = require('./routes/uploadProduct.route')

app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/upload', uploadRoutes)

app.use(function (req, res, next) {
    res.status(404);
    // respond with html page
    return res.status(404).json({
        status: 404,
        message: 'API NOT FOUND! Please check the endpoint and the HTTP request type! or contact admin  ',
        data: {
            url: req.url
        }
    });
});

module.exports = app;