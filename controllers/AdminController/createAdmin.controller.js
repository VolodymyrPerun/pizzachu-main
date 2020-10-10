const path = require('path');
const uuid = require('uuid').v1();
const fsep = require('fs-extra').promises;


const {
    responseStatusCodesEnum: {CREATED, NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_CREATED},
    emailActionEnum: {ADMIN_REGISTER},
    USER_ROLE: {ADMIN},
    USER_STATUS: {ACTIVE},
} = require('../../constants');
const ErrorHandler = require("../../error/ErrorHandler")
const {HashPasswordHelper} = require('../../helpers')
const {emailService, userService: {createUserService, updateUserService}} = require("../../service");


module.exports = async (req, res, next) => {
    try {
        const user = req.body;

        user.role_id = ADMIN;
        user.status_id = ACTIVE;

        const [profileImage] = req.photos;
        const password = user.password;

        user.password = await HashPasswordHelper(user.password);

        const isUserCreated = await createUserService(user);

        if (!isUserCreated) return next(new ErrorHandler(NOT_CREATED.message, NOT_FOUND_CODE, NOT_CREATED.customCode));

        if (profileImage) {
            const photoDir = `users/${isUserCreated.userId}/photos/`;
            const fileExtension = path.extname(profileImage.name);
            const photoName = uuid + fileExtension;

            await fsep.mkdir(path.resolve(process.cwd(), 'public', photoDir), {recursive: true});
            await profileImage.mv(path.resolve(process.cwd(), 'public', photoDir, photoName));
            await updateUserService(isUserCreated.userId, {user_photo: photoDir + photoName});
        }

        await emailService.sendMail(user.email, ADMIN_REGISTER, {user, password});

        res.sendStatus(CREATED);
    } catch (e) {
        next(e);
    }
};
