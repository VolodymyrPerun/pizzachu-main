const Joi = require('joi');

const {productSectionValidator: {productSectionValidationSchema}} = require("../../validators");
const {
    responseStatusCodesEnum: {BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID},
} = require('../../constants');
const ErrorHandler = require('../../error/ErrorHandler');

module.exports = (req, res, next) => {
    try {
        const productSection = req.body;

        const {error} = Joi.validate(productSection, productSectionValidationSchema);

        if (error) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                error.details[0].message,
                NOT_VALID.customCode));
        }

        req.productSection = productSection;

        next();

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
}
