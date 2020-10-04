const jwt = require('jsonwebtoken');

const {ErrorHandler, CustomErrorData: {UNAUTHORIZED_BAD_REFRESH_TOKEN}} = require("../error");
const {USER_ROLE: {ADMIN, SELLER, CLIENT}} = require("../constants");

const {
    ADMIN_REFRESH,
    JWT_REFRESH_SECRET,
    SELLER_REFRESH


} = require('../config');

module.exports = (token, method) => {

    if (method === ADMIN) {
        jwt.verify(token, ADMIN_REFRESH, err => {
            if (err) {
                throw new ErrorHandler(UNAUTHORIZED_BAD_REFRESH_TOKEN,
                    UNAUTHORIZED_BAD_REFRESH_TOKEN.message,
                    UNAUTHORIZED_BAD_REFRESH_TOKEN.code)
            }
        })
    }

    if (method === SELLER) {
        jwt.verify(token, SELLER_REFRESH, err => {
            if (err) {
                throw new ErrorHandler(UNAUTHORIZED_BAD_REFRESH_TOKEN,
                    UNAUTHORIZED_BAD_REFRESH_TOKEN.message,
                    UNAUTHORIZED_BAD_REFRESH_TOKEN.code)
            }
        })
    }

    if (method === CLIENT) {
        jwt.verify(token, JWT_REFRESH_SECRET, err => {
            if (err) {
                throw new ErrorHandler(UNAUTHORIZED_BAD_REFRESH_TOKEN,
                    UNAUTHORIZED_BAD_REFRESH_TOKEN.message,
                    UNAUTHORIZED_BAD_REFRESH_TOKEN.code)
            }
        })
    }
}
