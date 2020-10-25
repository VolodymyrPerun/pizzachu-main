const Joi = require('joi');

const {
    responseStatusCodesEnum: {BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID}
} = require('../../constants');

const {productTypeValidator: {updateProductTypeValidationSchema}} = require("../../validators");
const ErrorHandler = require('../../error/ErrorHandler');

module.exports = async (req, res, next) => {

    const productType = req.body;

    const {error} = Joi.validate(productType, updateProductTypeValidationSchema);

    if (error) return next(new ErrorHandler(
        BAD_REQUEST,
        error.details[0].message,
        NOT_VALID.customCode));

    req.productType = productType;

    next();

    res.end();
};
