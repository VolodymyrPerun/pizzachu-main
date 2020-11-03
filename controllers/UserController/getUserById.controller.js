const {
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET}
} = require('../../constants');
const {ErrorHandler} = require("../../error");

const {userService: {getUserByIdService}} = require("../../service");

module.exports = async (req, res, next) => {

    try {
        const {userId} = req.params;

        const user = await getUserByIdService(userId);

        if (!user) return next(new ErrorHandler(NOT_FOUND_CODE, NOT_GET.message, NOT_GET.customCode));

        await res.json(user).end();

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
