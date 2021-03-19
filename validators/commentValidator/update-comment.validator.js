const Joi = require('joi');

module.exports = Joi.object().keys({
    text: Joi.string().min(1).max(5555),
    updated_at: Joi.date()
});
