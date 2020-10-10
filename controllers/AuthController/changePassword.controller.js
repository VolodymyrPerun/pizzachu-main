const Joi = require('joi');

const {
    CustomErrorData: {BAD_REQUEST_ADMIN_NOT_PRESENT, FORBIDDEN_USER_IS_BLOCKED, BAD_REQUEST_WRONG_PASSWORD}
} = require("../../error");
const {USER_STATUS: {BLOCKED}} = require("../../constants");
const {authValidator: {changePasswordValidationSchema}} = require("../../validators");
const {
    responseStatusCodesEnum: {OK, BAD_REQUEST, FORBIDDEN},
    responseCustomErrorEnum: {NOT_VALID}
} = require('../../constants');
const {HashPasswordHelper, HashPasswordCheckHelper} = require('../../helpers');
const {ErrorHandler} = require('../../error');
const {
    userService: {getUserByIdService, updateUserService}
} = require('../../service');


module.exports = async (req, res, next) => {
    try {
        const {password, newPassword, repeatNewPassword} = req.body;
        const {userId} = req.user;

        //todo create compare password service, forgot pass and change pass controller, try to login user,
        //todo after that create admin controller and auth admin

        const user = await getUserByIdService(userId);


        // if (!user) {
        //     return next(new ErrorHandler(BAD_REQUEST,
        //         BAD_REQUEST_ADMIN_NOT_PRESENT.message,
        //         BAD_REQUEST_ADMIN_NOT_PRESENT.code,));
        // }
        //
        // if (user.status_id === BLOCKED) {
        //     return next(new ErrorHandler(FORBIDDEN,
        //         FORBIDDEN_USER_IS_BLOCKED.message,
        //         FORBIDDEN_USER_IS_BLOCKED.code,));
        // }

        await HashPasswordCheckHelper(user.password, password);

        const {error} = Joi.validate({password, newPassword, repeatNewPassword}, changePasswordValidationSchema);

        if (error) return next(new ErrorHandler(error.details[0].message, BAD_REQUEST, NOT_VALID.customCode));

        if (newPassword !== repeatNewPassword) {
            return next(new ErrorHandler(error.details[0].message, BAD_REQUEST_WRONG_PASSWORD, FORBIDDEN.customCode));
        }

        const hashPassword = await HashPasswordHelper(newPassword);

        await updateUserService({password: hashPassword}, userId);

        res.status(OK).end()
    } catch (e) {
        next(e)
    }
};
