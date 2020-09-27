const Joi = require('joi');

const {regexpAuthValidatorEnum} = require('../../constants');

module.exports = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(regexpAuthValidatorEnum).required()
});
