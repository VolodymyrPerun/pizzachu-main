const {ErrorHandler} = require('../../error');
const {responseStatusCodesEnum: {BAD_REQUEST}} = require('../../constants');

module.exports = (req, res, next) => {

    if (req.docs.length) {
        return next(new ErrorHandler('Ви не можете завантажувати інші файли користувачеві, окрім фото', BAD_REQUEST));
    }

    if (req.photos.length > 1) {
        return next(new ErrorHandler('Ви можете завантажити лише одну фотографію', BAD_REQUEST));
    }

    next();
};
