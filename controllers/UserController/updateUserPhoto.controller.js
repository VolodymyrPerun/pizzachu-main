const path = require('path');
const {CREATED} = require("../../constants/responseStatusCodes.enum");
const uuid = require('uuid').v1();
const fsep = require('fs-extra').promises;
const {updateUserService} = require("../../service/userService");


module.exports = async (req, res, next) => {

    try {
        let {
            user: {userId},
            photos
        } = req;

        const [profileImage] = photos;

        const photoDir = `users/${userId}/photos/`;
        const fileExtension = path.extname(profileImage.name);
        const photoName = uuid + fileExtension;


        await fsep.mkdir(path.resolve(process.cwd(), 'public', photoDir), {recursive: true});
        await profileImage.mv(path.resolve(process.cwd(), 'public', photoDir, photoName));
        await updateUserService({user_photo: photoDir + photoName}, userId);

        res.status(CREATED).json();

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
