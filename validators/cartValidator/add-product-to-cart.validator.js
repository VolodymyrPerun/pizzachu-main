const Joi = require('joi');

module.exports = Joi.object().keys({
    count: Joi.number().min(1).required()
});
