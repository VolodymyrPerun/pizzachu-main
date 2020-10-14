const Joi = require('joi');

const {productValidator: {productValidationSchema}} = require("../../validators");
const {
    responseStatusCodesEnum: {BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID},
} = require('../../constants');
const ErrorHandler = require('../../error/ErrorHandler');

module.exports = (req, res, next) => {
    try {
        const product = req.body;

        const {error} = Joi.validate(product, productValidationSchema);

        if (error) {
            return next(new ErrorHandler(BAD_REQUEST, error.details[0].message, NOT_VALID.customCode));
        }

        req.product = product;

        next();

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.code));
    }
}
