const {
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET},
} = require('../../constants');
const ErrorHandler = require("../../error/ErrorHandler")
const {userService: {getUsersService}} = require("../../service");


module.exports = async (req, res, next) => {
    try {
        const users = await getUsersService();

        if (!users) return next(new ErrorHandler(NOT_GET.message, NOT_FOUND_CODE, NOT_GET.customCode));

        res.json(users);
    } catch (e) {
        next(e);
    }
};
