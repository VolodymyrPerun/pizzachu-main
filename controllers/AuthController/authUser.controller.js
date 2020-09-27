const Joi = require('joi');

const {authValidator:{authValidationSchema}} = require("../../validators");
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

        //todo create compare password service, forgot pass and change pass controller, try to login user,
        //todo after that create admin controller and auth admin

        const {error} = Joi.validate({email, password}, authValidationSchema);

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
        next(new ErrorHandler(e.status, e.message, e.code));
    }
};
