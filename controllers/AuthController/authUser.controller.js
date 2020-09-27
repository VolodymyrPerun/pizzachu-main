const Joi = require('joi');

const {updateUserValidatorSchema} = require("../../validators");
const {
    responseStatusCodesEnum: {BAD_REQUEST, NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_VALID, NOT_FOUND}
} = require('../../constants')
const {tokenGeneratorHelpers, checkHashPasswordHelpers} = require('../../helpers')
const {ErrorHandler} = require('../../error')
const {
    oauthService: {createTokenPairService},
    userService: {getUserByParamsService}
} = require('../../service')


module.exports = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const {error} = Joi.validate({email, password}, updateUserValidatorSchema);

        if (error) return next(new ErrorHandler(error.details[0].message, BAD_REQUEST, NOT_VALID.customCode));

        const user = await getUserByParamsService({email});

        if (!user) {
            return next(new ErrorHandler(new ErrorHandler(NOT_FOUND.message, NOT_FOUND_CODE, NOT_FOUND.customCode)));
        }

        await checkHashPasswordHelpers(password, user.password);

        const tokens = tokenGeneratorHelpers();

        await createTokenPairService({...tokens, userId: user.userId});

        res.json(tokens);
    } catch (e) {
        next(e);
    }
};
