const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
require('dotenv').config();

let url = []
if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'Production'){
    url.push(process.env.UI_PRODUCTION_URL)
}else{
    url.push(process.env.UI_LOCAL_URL)
}

let corsOptions = {
    origin: [
        'https://www.lutui.in',
        'http://www.lutui.in',
        'https://lutui.in',
        'http://lutui.in',
        'www.lutui.in',
        'lutui.in',
    ],
    methods: ["GET", "PUT", "POST", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Lutui-Auth-Token",
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.set('trust proxy', true);

const _dirname = path.resolve();

require('./routes/zindex')(app);

const userRoutes = require('./routes/user.route')
const productRoutes = require('./routes/product.route')
const uploadRoutes = require('./routes/uploadProduct.route')
const ordersRoutes = require('./routes/orders.route')
const paymentRoutes = require('./routes/razorpay.route')
const visitors = require('./routes/visit.route')

app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/upload', uploadRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/api', paymentRoutes)
app.use('/api', visitors)

app.use(express.static(path.join(_dirname, '/frontend/dist')))
// app.get('*',(req, res)=>{
//     res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'));
// })

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