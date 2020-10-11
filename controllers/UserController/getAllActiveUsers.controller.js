const {
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET},
    USER_STATUS: {ACTIVE}
} = require('../../constants');
const {ErrorHandler} = require("../../error")
const {userService: {getUsersService}} = require("../../service");


module.exports = async (req, res, next) => {
    let activeUsers = [];
    try {
        activeUsers = await getUsersService(ACTIVE);

        if (!activeUsers) return next(new ErrorHandler(NOT_FOUND_CODE, NOT_GET.message, NOT_GET.customCode));

        res.json(activeUsers);
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.code));
    }
};
