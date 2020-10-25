const Joi = require('joi');

const {
    responseStatusCodesEnum: {BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID}
} = require('../../constants');

const {productSectionValidator: {updateProductSectionValidationSchema}} = require("../../validators");
const ErrorHandler = require('../../error/ErrorHandler');

module.exports = async (req, res, next) => {

    const productSection = req.body;

    const {error} = Joi.validate(productSection, updateProductSectionValidationSchema);

    if (error) return next(new ErrorHandler(
        BAD_REQUEST,
        error.details[0].message,
        NOT_VALID.customCode));

    req.productSection = productSection;

    next();

    res.end();
};
