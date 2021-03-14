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
    apartment: Joi.number().integer().min(1).max(10),
    entrance: Joi.number().integer().min(1).max(10),
    floor: Joi.number().integer().min(1).max(10),
    gender_id: Joi.number().integer().min(1).max(2)
});
