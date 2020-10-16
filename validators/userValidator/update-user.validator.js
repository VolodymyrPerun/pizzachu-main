const Joi = require('joi');

const {
    regexpPhoneNumberEnum: {PHONE_NUMBER},
} = require("../../constants");

module.exports = Joi.object().keys({
    name: Joi.string().trim().min(2).max(60).required().allow('X Æ A-12'),
    surname: Joi.string().trim().min(2).max(60).required().allow('X Æ A-12'),
    phone: Joi.string().regex(PHONE_NUMBER).required(),
    age: Joi.number().integer().min(18).max(120).required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    postOfficeLocation: Joi.string().required(),
    user_photo: Joi.string()
});
