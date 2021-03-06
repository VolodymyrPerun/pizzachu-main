const {
    historyActionEnum: {getAllUsersHistory},
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET},
    USER_STATUS: {ACTIVE, BLOCKED}
} = require('../../constants');
const {ErrorHandler} = require("../../error");
const {userService: {getUsersService}} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(getAllUsersHistory);


module.exports = userStatus => async (req, res, next) => {
    let keyStatus = '';
    let users = [];
    try {
        let {
            query: {limit, page},
        } = req;

        if (+page === 0) page = 1;
        page = page - 1;

        switch (userStatus) {
            case ACTIVE:
                keyStatus = ACTIVE
                break;
            case BLOCKED:
                keyStatus = BLOCKED
                break;
            default:
                return next(new ErrorHandler(NOT_FOUND_CODE, NOT_GET.message, NOT_GET.customCode));
        }

        users = await getUsersService(
            [keyStatus],
            +(limit),
            limit * page
        );

        if (!users) {
            logger.error({
                message: NOT_GET.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                NOT_FOUND_CODE,
                NOT_GET.message,
                NOT_GET.customCode));
        }

        res.json(users).end();
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
