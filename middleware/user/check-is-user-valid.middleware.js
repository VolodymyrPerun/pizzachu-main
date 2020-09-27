const Joi = require('joi');

const {userValidator: {userValidationSchema}} = require("../../validators");
const {
    responseStatusCodesEnum: {BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID},
} = require('../../constants');
const ErrorHandler = require('../../error/ErrorHandler');

module.exports = (req, res, next) => {
    try {
        const user = req.body;

        const {error} = Joi.validate(user, userValidationSchema)

        if (error) {
            return next(new ErrorHandler(error.details[0].message, BAD_REQUEST, NOT_VALID.customCode))
        }

        next();

    } catch (e) {
        res.render('error', {message: e.message})
    }
}
