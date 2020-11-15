const Joi = require('joi');

const {
    regexpPhoneNumberEnum: {PHONE_NUMBER},
    regexpPasswordEnum: {PASSWORD},
    regexpEmailEnum: {EMAIL}
} = require("../../constants");

module.exports = Joi.object().keys({
    name: Joi.string().trim().min(2).max(60).required().allow('X Æ A-12'),
    surname: Joi.string().trim().min(2).max(60).required().allow('X Æ A-12'),
    email: Joi.string().regex(EMAIL).required(),
    phone: Joi.string().regex(PHONE_NUMBER).required(),
    password: Joi.string().regex(PASSWORD).trim().min(8).required(),
    age: Joi.number().integer().min(18).max(120).required(),
    gender_id: Joi.number().integer().min(1).max(2).required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    house: Joi.string().required(),
    apartment: Joi.string(),
    entrance: Joi.string(),
    floor: Joi.string(),
    status_id: Joi.number().integer().min(1).max(2).required(),
    role_id: Joi.number().integer().min(1).max(3).required(),
    user_photo: Joi.string(),
    created_at: Joi.date(),

    // description: Joi.string().optional().allow(null, ''),
    // cars: Joi.array().items(
    //     Joi.object().keys({
    //         name: Joi.string()
    //     })
    // ).optional()
})
