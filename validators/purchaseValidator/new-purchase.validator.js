const Joi = require('joi');

const {
    regexpPhoneNumberEnum: {PHONE_NUMBER},
    regexpEmailEnum: {EMAIL}
} = require("../../constants");

module.exports = Joi.object().keys({
    name: Joi.string().trim().min(2).max(60).required().allow('X Æ A-12'),
    surname: Joi.string().trim().min(2).max(60).allow('X Æ A-12'),
    email: Joi.string().regex(EMAIL),
    phone: Joi.string().regex(PHONE_NUMBER).required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    house: Joi.string().required(),
    apartment: Joi.string(),
    entrance: Joi.string(),
    floor: Joi.string(),
    status_id: Joi.number().integer(),
    created_at: Joi.date(),
    updated_at: Joi.date(),
});
