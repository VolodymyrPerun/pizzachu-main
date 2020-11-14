const Joi = require('joi');

module.exports = Joi.object().keys({
    userId: Joi.number().integer().required(),
    productId: Joi.number().integer().required(),
    status_id: Joi.number().integer().required(),
    price: Joi.number().integer().required(),
    count: Joi.number().min(1).integer().required(),
    sum: Joi.number().integer().required(),
    created_at: Joi.date(),
    updated_at: Joi.date()
});
