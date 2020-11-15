const Joi = require('joi');

module.exports = Joi.object().keys({
    name: Joi.string().min(2).max(64),
    description: Joi.string(),
    price: Joi.number(),
    type_id: Joi.number().integer(),
    status_id: Joi.number().integer(),
    size_id: Joi.number().integer(),
    weight: Joi.number().integer(),
    section_id: Joi.number().integer(),
    product_photo: Joi.string()
});
