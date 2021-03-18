const Joi = require('joi');

module.exports = Joi.object().keys({
    text: Joi.string().min(1).max(455),
    updated_at: Joi.date()
});
