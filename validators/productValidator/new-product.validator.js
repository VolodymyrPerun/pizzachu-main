const Joi = require('joi');

module.exports = Joi.object().keys({
    name: Joi.string().min(2).max(64).required(),
    description: Joi.string(),
    price: Joi.number().required(),
    type_id: Joi.number().integer().required(),
    status_id: Joi.number().integer().required(),
    size_id: Joi.number().integer(),
    weight: Joi.number().required(),
    section_id: Joi.number().integer(),
    product_photo: Joi.string(),
    created_at: Joi.date()
});
