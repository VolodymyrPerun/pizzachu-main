const {
    responseStatusCodesEnum: {NO_CONTENT, NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_DELETE},
    emailActionEnum: {USER_DELETE}
} = require('../../constants');
const {ErrorHandler} = require("../../error")
const {
    emailService,
    userService: {deleteUserByParamsService, getUserByIdService},
    oauthService: {deleteTokenByParamsService}
} = require("../../service");


module.exports = async (req, res, next) => {
    // ! Sequalize method
    // const isDeleted = await req.user.destroy();
    // if (!isDeleted) return next(new ErrorHandler('Cannot delete user', 400, 4001));
    // res.sendStatus(204);

    try {
        const {userId} = req.params;
        const user = await getUserByIdService(userId);
        await deleteUserByParamsService({userId});
        await deleteTokenByParamsService({userId});



        await emailService.sendMail(user.email, USER_DELETE, {
            userName: user.name,
            userSurname: user.surname
        });

        res.sendStatus(NO_CONTENT);
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.code));
    }
};