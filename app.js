require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');

const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const {PORT} = require('./config');
const {responseStatusCodesEnum: {SERVER_ERROR}} = require("./constants");
require('./dataBase').getInstance().setModels();
const {WHITE_LIST, ENV} = require('./config');

const app = express();

if (ENV === 'DEV') {
    app.use(cors());
    app.use(morgan('dev'));
} else {
    app.use(cors({
        origin: (origin, callback) => {
            if (WHITE_LIST.split(';').includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    }));
}

app.use(fileUpload({}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'public'));


const {
    AdminRouter,
    AuthRouter,
    CartRouter,
    CommentRouter,
    ProductRouter,
    ProductTypeRouter,
    ProductSectionRouter,
    ReplyCommentRouter,
    SellerRouter,
    UserRouter
} = require('./routes');

app.use('/admin&blablabla', AdminRouter);
app.use('/auth', AuthRouter);
app.use('/cart', CartRouter);
app.use('/comments', CommentRouter);
app.use('/reply-comments', ReplyCommentRouter);
app.use('/sellers', SellerRouter);
app.use('/products', ProductRouter);
app.use('/product-types', ProductTypeRouter);
app.use('/product-sections', ProductSectionRouter);
app.use('/users', UserRouter);



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
