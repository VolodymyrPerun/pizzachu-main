const {ErrorHandler, CustomErrorData: {BAD_REQUEST_COMMENT_NOT_PRESENT}} = require('../../error');
const {commentService: {getCommentByIdService}} = require("../../service");
const {responseStatusCodesEnum: {BAD_REQUEST}, PRODUCT_STATUS: {DELETED}} = require("../../constants");

module.exports = async (req, res, next) => {
    try {
        const {
            params: {id}
        } = req;

        if (isNaN(id) || +id < 0) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_COMMENT_NOT_PRESENT.message,
                BAD_REQUEST_COMMENT_NOT_PRESENT.customCode
            ));
        }

        const comment = await getCommentByIdService(id);

        if (!comment || comment.status_id === DELETED) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_COMMENT_NOT_PRESENT.message,
                BAD_REQUEST_COMMENT_NOT_PRESENT.customCode
            ));
        }

        req.comment = comment;

        next();
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
