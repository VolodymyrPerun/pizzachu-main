const Joi = require('joi');

const {
    responseStatusCodesEnum: {BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID}
} = require('../../constants');
const {commentValidator: {updateCommentValidationSchema}} = require("../../validators");
const ErrorHandler = require('../../error/ErrorHandler');
const winston = require('../../logger/winston');
const logger = winston(NOT_VALID.message);

module.exports = async (req, res, next) => {
    try {
        const {body: comment} = req;

        const {error} = Joi.validate(comment, updateCommentValidationSchema);

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

        req.commentToUpdate = comment;

        next();
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
