const Joi = require('joi');

module.exports = Joi.object().keys({
    text: Joi.string().min(1).max(455).required(),
    status_id: Joi.number().integer(),
    created_at: Joi.date(),
    updated_at: Joi.date()
});
