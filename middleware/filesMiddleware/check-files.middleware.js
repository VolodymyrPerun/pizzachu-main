const {ErrorHandler} = require('../../error');
const {
    filesOptionsEnum: {DOC_MIMETYPES, MAX_DOC_SIZE, PHOTO_MIMETYPES, MAX_PHOTO_SIZE},
    responseStatusCodesEnum: {BAD_REQUEST, FORBIDDEN}
} = require('../../constants');
const {CustomErrorData: {FORBIDDEN_PHOTO_NOT_PRESENT}} = require('../../error');

module.exports = (req, res, next) => {
    req.photos = [];
    req.docs = [];

    if (!req.files) {
        return next(new ErrorHandler(
            FORBIDDEN,
            FORBIDDEN_PHOTO_NOT_PRESENT.message,
            FORBIDDEN_PHOTO_NOT_PRESENT.customCode
        ));
    }

    const files = Object.values(req.files);

    for (let i = 0; i < files.length; i++) {
        const {size, mimetype, name} = files[i];

        if (PHOTO_MIMETYPES.includes(mimetype)) {

            if (size > MAX_PHOTO_SIZE) {
                return next(
                    new ErrorHandler(`Максимальний розмір файлу - ${MAX_PHOTO_SIZE}`, BAD_REQUEST)
                );
            }

            req.photos.push(files[i]);
        } else if (DOC_MIMETYPES.includes(mimetype)) {
            if (size > MAX_DOC_SIZE) {
                return next(
                    new ErrorHandler(`Максимальний розмір файлу - ${MAX_DOC_SIZE}`, BAD_REQUEST)
                );
            }

            req.docs.push(files[i]);
        } else {
            next(new ErrorHandler(`File ${name} is not valid`, BAD_REQUEST));
        }
    }

    next();
}
