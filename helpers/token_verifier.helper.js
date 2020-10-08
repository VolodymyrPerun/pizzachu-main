const jwt = require('jsonwebtoken');

const {ErrorHandler, CustomErrorData: {UNAUTHORIZED_BAD_ACCESS_TOKEN}} = require("../error");
const {USER_ROLE: {ADMIN, SELLER, CLIENT}} = require("../constants");

const {
    ADMIN_ACCESS,
    JWT_SECRET,
    SELLER_ACCESS


} = require('../config');

module.exports = (token, method) => {

    if (method === ADMIN) {
        jwt.verify(token, ADMIN_ACCESS, err => {
            if (err) {
                throw new ErrorHandler(UNAUTHORIZED_BAD_ACCESS_TOKEN,
                    UNAUTHORIZED_BAD_ACCESS_TOKEN.message,
                    UNAUTHORIZED_BAD_ACCESS_TOKEN.code)
            }
        })
    }

    if (method === SELLER) {
        jwt.verify(token, SELLER_ACCESS, err => {
            if (err) {
                throw new ErrorHandler(UNAUTHORIZED_BAD_ACCESS_TOKEN,
                    UNAUTHORIZED_BAD_ACCESS_TOKEN.message,
                    UNAUTHORIZED_BAD_ACCESS_TOKEN.code)
            }
        })
    }

    if (method === CLIENT) {
        jwt.verify(token, JWT_SECRET, err => {
            if (err) {
                throw new ErrorHandler(UNAUTHORIZED_BAD_ACCESS_TOKEN,
                    UNAUTHORIZED_BAD_ACCESS_TOKEN.message,
                    UNAUTHORIZED_BAD_ACCESS_TOKEN.code)
            }
        })
    }
}
