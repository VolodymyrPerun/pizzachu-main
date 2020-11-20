const Joi = require('joi');

module.exports = Joi.object().keys({
    text: Joi.string().min(1).max(455),
    rate: Joi.number().min(1).max(5).integer(),
    updated_at: Joi.date()
});
