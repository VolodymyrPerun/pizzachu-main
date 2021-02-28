const Joi = require('joi');

const {
    regexpPhoneNumberEnum: {PHONE_NUMBER},
    regexpEmailEnum: {EMAIL}
} = require("../../constants");

module.exports = Joi.object().keys({
    name: Joi.string().trim().min(2).max(60).required().allow('X Æ A-12'),
    email: Joi.string().regex(EMAIL),
    phone: Joi.string().regex(PHONE_NUMBER),
    productName: Joi.string().min(2).max(64),
    product_photo: Joi.string(),
    city: Joi.string(),
    street: Joi.string(),
    house: Joi.string(),
    apartment: Joi.number().integer(),
    entrance: Joi.number().integer(),
    floor: Joi.number().integer(),
    status_id: Joi.number().integer(),
    created_at: Joi.date(),
    updated_at: Joi.date(),
});
