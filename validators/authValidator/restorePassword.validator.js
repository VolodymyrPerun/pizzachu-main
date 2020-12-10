const Joi = require('joi');

const {
    regexpEmailEnum: {EMAIL}
} = require("../../constants");

module.exports = Joi.object().keys({
    email: Joi.string().regex(EMAIL).required(),
});
