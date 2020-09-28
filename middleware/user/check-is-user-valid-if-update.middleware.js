const Joi = require('joi');

const {
    responseStatusCodesEnum: {BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID}
} = require('../../constants');

const {userValidator: {updateUserValidatorSchema}} = require("../../validators");
const ErrorHandler = require('../../error/ErrorHandler');

module.exports = (req, res, next) => {
    try {
        const {name, surname, age, phone, city, address, postOfficeLocation, user_photo} = req.body;

        const {error} = Joi.validate({
            name,
            surname,
            age,
            phone,
            city,
            address,
            postOfficeLocation,
            user_photo
        }, updateUserValidatorSchema);

        if (error) return next(new ErrorHandler(error.details[0].message, BAD_REQUEST, NOT_VALID.customCode));

        next();
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.code));
    }
};
