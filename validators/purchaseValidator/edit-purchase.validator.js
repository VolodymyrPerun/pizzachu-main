const Joi = require('joi');

const {
    regexpPhoneNumberEnum: {PHONE_NUMBER},
    regexpEmailEnum: {EMAIL}
} = require("../../constants");

module.exports = Joi.object().keys({
    name: Joi.string().trim().min(2).max(60).allow('X Æ A-12'),
    surname: Joi.string().trim().min(2).max(60).allow('X Æ A-12'),
    phone: Joi.string().regex(PHONE_NUMBER),
    city: Joi.string(),
    street: Joi.string(),
    house: Joi.string(),
    apartment: Joi.string(),
    entrance: Joi.string(),
    floor: Joi.string(),
    count: Joi.number().min(1),
    updated_at: Joi.date()
});
