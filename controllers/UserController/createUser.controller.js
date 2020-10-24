const path = require('path');
const uuid = require('uuid').v1();
const fsep = require('fs-extra').promises;
const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {ErrorHandler} = require("../../error");
const {
    responseStatusCodesEnum: {CREATED, NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_CREATED},
    emailActionEnum: {ADMIN_REGISTER, SELLER_REGISTER, USER_REGISTER},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    USER_ROLE: {ADMIN, CLIENT, SELLER},
    USER_STATUS: {ACTIVE},
} = require('../../constants');
const {HashPasswordHelper} = require('../../helpers');
const {emailService, userService: {createUserService, updateUserService}} = require("../../service");


module.exports = (userRole) => async (req, res, next) => {
    const transaction = await transactionInstance();
    let keyRole = '';
    let emailAction = '';
    try {
        switch (userRole) {
            case ADMIN:
                keyRole = ADMIN;
                emailAction = ADMIN_REGISTER;
                break;
            case CLIENT:
                keyRole = CLIENT;
                emailAction = USER_REGISTER;
                break;
            case SELLER:
                keyRole = SELLER;
                emailAction = SELLER_REGISTER;
                break;
            default:
                return next(new ErrorHandler(
                    NOT_FOUND_CODE,
                    NOT_CREATED.message,
                    NOT_CREATED.customCode));
        }

        const user = req.body;

        user.role_id = [keyRole];
        user.status_id = ACTIVE;

        const [profileImage] = req.photos;
        const password = user.password;

        user.password = await HashPasswordHelper(user.password);

        const isUserCreated = await createUserService(user, transaction);

        if (!isUserCreated) return next(new ErrorHandler(NOT_FOUND_CODE, NOT_CREATED.message, NOT_CREATED.customCode));

        if (profileImage) {
            const photoDir = `users/${isUserCreated.userId}/photos/`;
            const fileExtension = path.extname(profileImage.name);
            const photoName = uuid + fileExtension;

            await fsep.mkdir(path.resolve(process.cwd(), 'public', photoDir), {recursive: true});
            await profileImage.mv(path.resolve(process.cwd(), 'public', photoDir, photoName));
            await updateUserService(isUserCreated.userId, {user_photo: photoDir + photoName}, transaction);
        }

        await emailService.sendMail(user.email, [emailAction], {user, password});

        await transaction.commit();
        console.log(chalk.bgYellow.bold.cyan(TRANSACTION_COMMIT));

        res.status(CREATED).end();
    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red(TRANSACTION_ROLLBACK));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
