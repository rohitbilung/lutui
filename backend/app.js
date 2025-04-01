const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')

let corsOptions = {
    origin: true,
    methods: ["GET", "PUT", "POST", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const userRoutes = require('./routes/user.route')
const productRoutes = require('./routes/product.route')
const uploadRoutes = require('./routes/uploadProduct.route')
const ordersRoutes = require('./routes/orders.route')
const skuRoutes = require('./routes/itemsku.route')

app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/upload', uploadRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/api/skus', skuRoutes)

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