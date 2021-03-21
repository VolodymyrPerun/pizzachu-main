const {
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET},
    COMMENT_STATUS: {POSTED}
} = require('../../constants');
const {ErrorHandler} = require('../../error');
const {repliedCommentService: {getAllRepliedComments}} = require('../../service');


module.exports = async (req, res, next) => {
    let commentsData = {};
    try {
        let {
            query: {id, limit, page},
        } = req;

        if (+page === 0) page = 1;
        page = page - 1;

        let comments = await getAllRepliedComments(
            POSTED,
            id,
            +(limit),
            limit * page
        );

        let noLimitsComments = await getAllRepliedComments(
            POSTED,
            id,
            null,
            null
        );

        if (!comments) {
            logger.error({
                message: NOT_GET.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                NOT_FOUND_CODE,
                NOT_GET.message,
                NOT_GET.customCode));
        }

        commentsData.comments = comments;
        commentsData.commentsCount = noLimitsComments.length;

        await res.json(commentsData);

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};

