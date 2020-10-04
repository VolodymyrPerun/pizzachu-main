const jwt = require('jsonwebtoken');
const {responseCustomErrorEnum: {NOT_VALID_TOKEN_METHOD}} = require("../constants");
const {ErrorHandler} = require("../error");
const {USER_ROLE: {ADMIN, SELLER, CLIENT}} = require("../constants");


const {
    ADMIN_ACCESS,
    ADMIN_REFRESH,
    JWT_ADMIN_SECRET_TIME,
    JWT_ADMIN_REFRESH_SECRET_TIME,
    JWT_SECRET,
    JWT_SECRET_TIME,
    JWT_REFRESH_SECRET,
    JWT_REFRESH_SECRET_TIME,
    SELLER_ACCESS,
    SELLER_REFRESH,
    JWT_SELLER_SECRET_TIME,
    JWT_SELLER_REFRESH_SECRET_TIME


} = require('../config');


module.exports = method => {

    if (method === ADMIN) {
        const access_token = jwt.sign({}, ADMIN_ACCESS,
            {expiresIn: JWT_ADMIN_SECRET_TIME});
        const refresh_token = jwt.sign({}, ADMIN_REFRESH,
            {expiresIn: process.env.JWT_ADMIN_REFRESH_SECRET_TIME || JWT_ADMIN_REFRESH_SECRET_TIME});

        return {
            access_token,
            refresh_token
        }
    }

    if (method === CLIENT) {
        const access_token = jwt.sign({},
            JWT_SECRET,
            {expiresIn: JWT_SECRET_TIME});
        const refresh_token = jwt.sign({},
            JWT_REFRESH_SECRET,
            {expiresIn: process.env.JWT_REFRESH_SECRET_TIME || JWT_REFRESH_SECRET_TIME});

        return {
            access_token,
            refresh_token
        }
    }

    if (method === SELLER) {
        const access_token = jwt.sign({}, SELLER_ACCESS,
            {expiresIn: JWT_SELLER_SECRET_TIME});
        const refresh_token = jwt.sign({}, SELLER_REFRESH,
            {expiresIn: process.env.JWT_SELLER_REFRESH_SECRET_TIME || JWT_SELLER_REFRESH_SECRET_TIME});

        return {
            access_token,
            refresh_token
        }
    }
    throw new ErrorHandler(NOT_VALID_TOKEN_METHOD,
        NOT_VALID_TOKEN_METHOD.message,
        NOT_VALID_TOKEN_METHOD.code)
};
