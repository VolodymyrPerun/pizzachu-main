const Joi = require('joi');

const {
    responseStatusCodesEnum: {BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID}
} = require('../../constants');
const {purchaseValidator: {purchaseValidationSchema}} = require("../../validators");
const ErrorHandler = require('../../error/ErrorHandler');
const winston = require('../../logger/winston');
const logger = winston(NOT_VALID.message);

module.exports = async (req, res, next) => {
    try {
        const purchase = req.body;

        const {error} = Joi.validate(purchase, purchaseValidationSchema);

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

        req.purchase = purchase;

        next();
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
