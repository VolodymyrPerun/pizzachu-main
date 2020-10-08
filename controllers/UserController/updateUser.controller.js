const {
    responseStatusCodesEnum: {OK, NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_UPDATE},
    emailActionEnum: {USER_UPDATE}
} = require('../../constants');
const {ErrorHandler} = require("../../error")
const {checkHashPasswordHelper} = require('../../helpers')
const {emailService: {sendMail}, userService: {updateUserService, getUserByIdService}} = require("../../service");


module.exports = async (req, res, next) => {
    // ! Sequalize method
    // const user = req.body;
    // user.password = await hashUserPassword(user.password);
    // const isUpdated = await userService.update(req.user, user);
    // if (!isUpdated) return next(new ErrorHandler('Cannot update user', 400, 4001));
    // res.sendStatus(200);

    try {
        const {userId} = req.params;
        const updatedUser = req.body;

        const userFromDB = await getUserByIdService(userId);
        updatedUser.password = await checkHashPasswordHelper(updatedUser.password);

        const [isUpdated] = await updateUserService(userId, updatedUser);

        if (!isUpdated) return next(new ErrorHandler(NOT_UPDATE.message, NOT_FOUND_CODE, NOT_UPDATE.customCode));

        await sendMail(userFromDB.email, USER_UPDATE, {user: updatedUser});

        res.sendStatus(OK);
    } catch (e) {
        next(e);
    }
};
