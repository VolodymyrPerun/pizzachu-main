const Joi = require('joi')

module.exports = Joi.object().keys({
    name: Joi.string().min(2).max(64).required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    type_id: Joi.number().integer().required(),
    status_id: Joi.number().integer().required(),
    size_id: Joi.number().integer().required(),
    weight: Joi.number().integer().required(),
    section_id: Joi.number().integer(),
    product_photo: Joi.string()
});
