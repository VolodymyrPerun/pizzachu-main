const Joi = require('joi');

const {
    responseStatusCodesEnum: {BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID}
} = require('../../constants');

const {userValidator: {updateUserValidationSchema}} = require("../../validators");
const ErrorHandler = require('../../error/ErrorHandler');

module.exports = (req, res, next) => {
    try {
        const user = req.body;

        const {error} = Joi.validate(user, updateUserValidationSchema);

        if (error) return next(new ErrorHandler(
            BAD_REQUEST,
            error.details[0].message,
            NOT_VALID.customCode));

        req.user;

        next();

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.code));
    }
};
