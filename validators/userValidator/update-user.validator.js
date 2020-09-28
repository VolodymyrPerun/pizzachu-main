const Joi = require('joi');
const {regexpPhoneNumberEnum} = require("../../constants");

module.exports = Joi.object().keys({
    name: Joi.string().min(2).max(40).required(),
    surname: Joi.string().min(2).max(40).required(),
    age: Joi.number().integer().min(1).max(120).required(),
    phone: Joi.string().regex(regexpPhoneNumberEnum.PHONE_NUMBER).required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    postOfficeLocation: Joi.string().required(),
    user_photo: Joi.string()
});
