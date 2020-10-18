const {
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET},
    USER_STATUS: {ACTIVE, BLOCKED}
} = require('../../constants');
const {ErrorHandler} = require("../../error");
const {userService: {getUsersService}} = require("../../service");


module.exports = (userStatus) => async (req, res, next) => {
    let keyName = ''
    let users = [];
    try {

        switch (userStatus) {
            case ACTIVE:
                keyName = ACTIVE
                break;
            case BLOCKED:
                keyName = BLOCKED
                break;
            default:
                return next(new ErrorHandler(NOT_FOUND_CODE, NOT_GET.message, NOT_GET.customCode));
        }

        users = await getUsersService([keyName]);

        if (!users) return next(new ErrorHandler(NOT_FOUND_CODE, NOT_GET.message, NOT_GET.customCode));

        res.json(users);
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.code));
    }
};
