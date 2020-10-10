const Joi = require('joi');

const {regexpAuthValidatorEnum} = require('../../constants');

module.exports = Joi.object().keys({
    password: Joi.string().regex(regexpAuthValidatorEnum).required(),
    newPassword: Joi.string().regex(regexpAuthValidatorEnum).required(),
    repeatNewPassword: Joi.string().regex(regexpAuthValidatorEnum).required()
});
