const Joi = require('joi');

const {cartValidator:{CartProductValidationSchema}} = require("../../validators");
const {
    responseStatusCodesEnum: {BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID},
} = require('../../constants');
const {ErrorHandler} = require('../../error');
const winston = require('../../logger/winston');
const logger = winston(NOT_VALID.message);

module.exports = (req, res, next) => {
    try {
        const {
            product: {productId},
            user: {userId}
        } = req;

        console.log(userId);


        req.userProceedCart = userProceedCart;

        next();
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
