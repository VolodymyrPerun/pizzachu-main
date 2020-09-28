const {
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET},
    USER_STATUS:{BLOCKED}
} = require('../../constants');
const {ErrorHandler} = require("../../error")
const {userService: {getUsersService}} = require("../../service");


module.exports = async (req, res, next) => {
    let blockedUsers = [];
    try {
        blockedUsers = await getUsersService(BLOCKED);

        if (!blockedUsers) return next(new ErrorHandler(NOT_GET.message, NOT_FOUND_CODE, NOT_GET.customCode));

        res.json(blockedUsers);
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.code));
    }
};
