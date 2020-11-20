const Joi = require('joi');

const {commentValidator: {commentValidationSchema}} = require("../../validators");
const {
    responseStatusCodesEnum: {BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID},
} = require('../../constants');
const {ErrorHandler} = require('../../error');
const winston = require('../../logger/winston');
const logger = winston(NOT_VALID.message);

module.exports = (req, res, next) => {
    try {
        const {body: comment} = req;

        const {error} = Joi.validate(comment, commentValidationSchema);

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

        req.comment = comment;

        next();
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
