const {ErrorHandler, CustomErrorData: {BAD_REQUEST_USER_NOT_PRESENT}} = require('../../error');
const {userService: {getUserByIdService}} = require("../../service");
const {responseStatusCodesEnum: {BAD_REQUEST}} = require("../../constants");

module.exports = async (req, res, next) => {
    try {
        const {userId} = req.params;

        if (isNaN(userId) || +userId < 0) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_USER_NOT_PRESENT.message,
                BAD_REQUEST_USER_NOT_PRESENT.customCode
            ));
        }

        const user = await getUserByIdService(userId);

        if (!user) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_USER_NOT_PRESENT.message,
                BAD_REQUEST_USER_NOT_PRESENT.customCode
            ));
        }

        req.user = user;

        next();
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
