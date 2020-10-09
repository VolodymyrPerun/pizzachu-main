const Joi = require('joi');

const {
    CustomErrorData: {BAD_REQUEST_ADMIN_NOT_PRESENT, FORBIDDEN_USER_IS_BLOCKED}
} = require("../../error");
const {USER_ROLE: {ADMIN}, USER_STATUS: {BLOCKED}, JWT_METHOD} = require("../../constants");
const {authValidator: {authValidationSchema}} = require("../../validators");
const {
    responseStatusCodesEnum: {BAD_REQUEST, FORBIDDEN},
    responseCustomErrorEnum: {NOT_VALID}
} = require('../../constants');
const {tokenGeneratorHelper, checkHashPasswordHelper} = require('../../helpers');
const {ErrorHandler} = require('../../error');
const {
    oauthService: {createTokenPairService},
    userService: {getUserByParamsService}
} = require('../../service');


module.exports = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        //todo create compare password service, forgot pass and change pass controller, try to login user,
        //todo after that create admin controller and auth admin

        const admin = await getUserByParamsService({email, role_id: ADMIN});


        if (!admin) {
            return next(new ErrorHandler(BAD_REQUEST,
                BAD_REQUEST_ADMIN_NOT_PRESENT.message,
                BAD_REQUEST_ADMIN_NOT_PRESENT.code,));
        }

        if (admin.status_id === BLOCKED) {
            return next(new ErrorHandler(FORBIDDEN,
                FORBIDDEN_USER_IS_BLOCKED.message,
                FORBIDDEN_USER_IS_BLOCKED.code,));
        }

        const {error} = Joi.validate({email, password}, authValidationSchema);

        if (error) return next(new ErrorHandler(error.details[0].message, BAD_REQUEST, NOT_VALID.customCode));

        await checkHashPasswordHelper(password, admin.password);

        const tokens = tokenGeneratorHelper(JWT_METHOD.ADMIN);
        console.log(tokens);

        await createTokenPairService({userId: admin.userId, ...tokens});

        res.json(tokens);
    } catch (e) {
        next(e)
    }
};
