const Joi = require('joi')

module.exports = Joi.object().keys({
    userId: Joi.number().integer(),
    productId: Joi.number().integer(),
    status_id: Joi.number().integer(),
    price: Joi.number().integer(),
    count: Joi.number().min(1).integer(),
    sum: Joi.number().integer(),
    created_at: Joi.date(),
    updated_at: Joi.date()
});
