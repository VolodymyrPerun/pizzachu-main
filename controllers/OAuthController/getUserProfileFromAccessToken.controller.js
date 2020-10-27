const {
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_FOUND}
} = require('../../constants');
const {ErrorHandler} = require('../../error');
const {
    authService: {getUserProfileFromAccessTokenService}
} = require('../../service');


module.exports = async (req, res, next) => {
    try {
        const {userId} = req.user;

        const user = await getUserProfileFromAccessTokenService({userId});

        if (!user) {
            return next(new ErrorHandler(
                NOT_FOUND_CODE,
                NOT_FOUND.message,
                NOT_FOUND.customCode));
        }

        res.json(user);
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
