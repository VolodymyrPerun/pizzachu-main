const Joi = require('joi');

const {
    responseStatusCodesEnum: {BAD_REQUEST},
    responseCustomErrorEnum: {NOT_VALID}
} = require('../../constants');

const {cartValidator: {updateProductInCartValidationSchema}} = require("../../validators");
const {ErrorHandler, CustomErrorData: {BAD_REQUEST_WRONG_COUNT}} = require('../../error');

module.exports = async (req, res, next) => {

    const {body: count} = req;

    if (!count) {
        return next(new ErrorHandler(
            BAD_REQUEST,
            BAD_REQUEST_WRONG_COUNT.message,
            BAD_REQUEST_WRONG_COUNT.customCode
        ));
    }

    const {error} = Joi.validate(count, updateProductInCartValidationSchema);

    if (error) return next(new ErrorHandler(
        BAD_REQUEST,
        error.details[0].message,
        NOT_VALID.customCode));

    req.count = count;

    next();

    res.end();
};
