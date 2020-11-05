const Joi = require('joi');

const {productValidator: {productValidationSchema}} = require("../../validators");
const {
    responseStatusCodesEnum: {BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID},
} = require('../../constants');
const ErrorHandler = require('../../error/ErrorHandler');
const winston = require('../../logger/winston');

const logger = winston(NOT_VALID.message);

module.exports = (req, res, next) => {
    try {
        const {body: product} = req;

        const {error} = Joi.validate(product, productValidationSchema);

        if (error) {
            logger.error({
                message: error.details[0].message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                BAD_REQUEST,
                error.details[0].message,
                NOT_VALID.customCode));
        }

        req.product = product;

        next();

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
