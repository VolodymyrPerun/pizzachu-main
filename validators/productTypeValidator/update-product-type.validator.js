const Joi = require('joi')

module.exports = Joi.object().keys({
    id: Joi.number().integer(),
    type: Joi.string().min(2).max(25).required()
});
