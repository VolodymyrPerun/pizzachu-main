const path = require('path');
const uuid = require('uuid').v1();
const fsep = require('fs-extra').promises;
const chalk = require('chalk')

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    emailActionEnum: {USER_REGISTER},
    responseCustomErrorEnum: {NOT_CREATED},
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    USER_ROLE: {CLIENT},
    USER_STATUS: {ACTIVE},
} = require('../../constants');
const ErrorHandler = require("../../error/ErrorHandler")
const {HashPasswordHelper} = require('../../helpers')
const {emailService, userService: {createUserService, updateUserService}} = require("../../service");


module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const user = req.body;

        user.role_id = CLIENT;
        user.status_id = ACTIVE;

        const [profileImage] = req.photos;
        const password = user.password;

        user.password = await HashPasswordHelper(user.password);

        const isUserCreated = await createUserService(user);

        if (!isUserCreated) return next(new ErrorHandler(NOT_FOUND_CODE, NOT_CREATED.message, NOT_CREATED.customCode));

        if (profileImage) {
            const photoDir = `users/${isUserCreated.userId}/photos/`;
            const fileExtension = path.extname(profileImage.name);
            const photoName = uuid + fileExtension;

            await fsep.mkdir(path.resolve(process.cwd(), 'public', photoDir), {recursive: true});
            await profileImage.mv(path.resolve(process.cwd(), 'public', photoDir, photoName));
            await updateUserService(isUserCreated.userId, {user_photo: photoDir + photoName});
        }

        await emailService.sendMail(user.email, USER_REGISTER, {user, password});

        await transaction.commit();
        console.log(chalk.bgYellow.bold.cyan(TRANSACTION_COMMIT));

        res.end();
    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red(TRANSACTION_ROLLBACK));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
