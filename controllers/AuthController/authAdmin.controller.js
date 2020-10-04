const Joi = require('joi');

const {
    CustomErrorData: {BAD_REQUEST_ADMIN_NOT_PRESENT, FORBIDDEN_USER_IS_BLOCKED}
} = require("../../error");

const {USER_ROLE: {ADMIN}, USER_STATUS: {BLOCKED}} = require("../../constants");

const {authValidator: {authValidationSchema}} = require("../../validators");
const {
    responseStatusCodesEnum: {BAD_REQUEST, FORBIDDEN},
    responseCustomErrorEnum: {NOT_VALID}
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

        const user = await getUserByParamsService({email, role_id: ADMIN});

        if (!user) {
            return next(new ErrorHandler(BAD_REQUEST,
                BAD_REQUEST_ADMIN_NOT_PRESENT.message,
                BAD_REQUEST_ADMIN_NOT_PRESENT.code,));
        }

        if (user.status_id === BLOCKED) {
            return next(new ErrorHandler(FORBIDDEN,
                FORBIDDEN_USER_IS_BLOCKED.message,
                FORBIDDEN_USER_IS_BLOCKED.code,));
        }

        const {error} = Joi.validate({email, password}, authValidationSchema);

        if (error) return next(new ErrorHandler(error.details[0].message, BAD_REQUEST, NOT_VALID.customCode));

        await checkHashPasswordHelpers(user.password, password);

        const tokens = tokenGeneratorHelpers();

        await createTokenPairService({userId: user.userId, ...tokens});

        res.json(tokens).end();
    } catch (e) {
        next(e);
    }
};