const Joi = require('joi');

module.exports = Joi.object().keys({
    id: Joi.number().integer().required(),
    section: Joi.string().min(2).max(25).required()
});
