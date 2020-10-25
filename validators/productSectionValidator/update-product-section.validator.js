const Joi = require('joi')

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    section: Joi.string().min(2).max(25).required()
});
