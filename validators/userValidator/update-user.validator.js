const Joi = require('joi');

const {
    regexpPhoneNumberEnum: {PHONE_NUMBER},
} = require("../../constants");

module.exports = Joi.object().keys({
    name: Joi.string().trim().min(2).max(60).allow('X Æ A-12'),
    surname: Joi.string().trim().min(2).max(60).allow('X Æ A-12'),
    phone: Joi.string().regex(PHONE_NUMBER),
    age: Joi.number().integer().min(18).max(120),
    city: Joi.string(),
    street: Joi.string(),
    house: Joi.string(),
    apartment: Joi.string(),
    entrance: Joi.string(),
    floor: Joi.string(),
    user_photo: Joi.string()
});
