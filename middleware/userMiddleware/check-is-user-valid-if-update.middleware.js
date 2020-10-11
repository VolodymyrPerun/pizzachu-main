const Joi = require('joi');

const {
    responseStatusCodesEnum: {BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID}
} = require('../../constants');

const {userValidator: {updateUserValidatorSchema}} = require("../../validators");
const ErrorHandler = require('../../error/ErrorHandler');

module.exports = async (req, res, next) => {
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

        if (error) return next(new ErrorHandler(BAD_REQUEST, error.details[0].message, NOT_VALID.customCode));

        next();

        res.end();
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
