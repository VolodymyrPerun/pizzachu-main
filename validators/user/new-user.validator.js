const Joi = require('joi')


const {regexpEmailEnum, regexpPasswordEnum} = require('../../constants')

module.exports = Joi.object().keys({
    name: Joi.string().trim().min(2).max(60).required().allow('X Æ A-12'),
    surname: Joi.string().trim().min(2).max(60).required().allow('X Æ A-12'),
    email: Joi.string().regex(regexpEmailEnum.EMAIL).required(),
    phone: Joi.string().required(),
    password: Joi.string().regex(regexpPasswordEnum.PASSWORD).trim().min(8).required(),
    age: Joi.number().integer().min(18).max(120).required(),
    gender_id: Joi.number().integer().min(1).max(2),
    city: Joi.string().required(),
    address: Joi.string().required(),
    postOfficeLocation: Joi.string().required(),
    status_id: Joi.number().integer().min(1).max(2),
    role_id: Joi.number().integer().min(1).max(3).required(),
    created_at: Joi.date(),

    // description: Joi.string().optional().allow(null, ''),
    // cars: Joi.array().items(
    //     Joi.object().keys({
    //         name: Joi.string()
    //     })
    // ).optional()
})
