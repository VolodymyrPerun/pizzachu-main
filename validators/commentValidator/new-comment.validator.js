const Joi = require('joi');

module.exports = Joi.object().keys({
    text: Joi.string().min(1).max(455).required(),
    rate: Joi.number().min(1).max(5).integer(),
    status_id: Joi.number().integer(),
    created_at: Joi.date(),
    updated_at: Joi.date()
});
