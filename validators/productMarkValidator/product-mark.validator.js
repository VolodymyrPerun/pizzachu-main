const Joi = require('joi');

module.exports = Joi.object().keys({
    mark: Joi.number().integer().min(1).max(5).required(),
    userId: Joi.number().integer().required(),
    productId: Joi.number().integer().required(),
    isEvaluated: Joi.boolean()
});
