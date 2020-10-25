require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');

const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const {PORT} = require('./config');
const {responseStatusCodesEnum: {SERVER_ERROR}} = require("./constants");
require('./dataBase').getInstance().setModels();


const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(fileUpload({}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.set('views', path.join(__dirname, 'public'));


const {
    AdminRouter,
    AuthRouter,
    UserRouter,
    ProductRouter,
    SellerRouter,
    ProductTypeRouter
} = require('./routes');

app.use('/admin&blablabla', AdminRouter);
app.use('/auth', AuthRouter);
app.use('/sellers', SellerRouter);
app.use('/users', UserRouter);
app.use('/products', ProductRouter);
app.use('/product-types', ProductTypeRouter);


app.use((err, req, res, next) => {
    res
        .status(err.status || SERVER_ERROR)
        .json({
            status: err.status,
            message: err.message || 'Unknown Error',
            code: err.customCode
        })
});


app.listen(PORT || 5000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server listening on port: ${PORT || 5000}...`);
    }
});

const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, p) => {
    unhandledRejections.set(p, reason);
});
process.on('rejectionHandled', (p) => {
    unhandledRejections.delete(p);
});

const {cronRun} = require('./cron');
cronRun();
