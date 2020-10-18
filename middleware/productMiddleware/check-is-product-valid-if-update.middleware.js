const Joi = require('joi');

const {
    responseStatusCodesEnum: {BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID}
} = require('../../constants');

const {productValidator: {updateProductValidationSchema}} = require("../../validators");
const ErrorHandler = require('../../error/ErrorHandler');

module.exports = async (req, res, next) => {

    const product = req.body;

    const {error} = Joi.validate(product, updateProductValidationSchema);

    if (error) return next(new ErrorHandler(BAD_REQUEST, error.details[0].message, NOT_VALID.customCode));

    req.product = product;

    next();

    res.end();
};
