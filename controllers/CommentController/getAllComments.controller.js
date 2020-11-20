const {avgCountHelper} = require("../../helpers");
const {
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET},
    COMMENT_STATUS: {POSTED}
} = require('../../constants');
const {ErrorHandler} = require('../../error');
const {commentService: {getAllComments}} = require('../../service');

module.exports = async (req, res, next) => {
    let commentsData = {};
    try {
        let {
            query: {limit, page},
        } = req;

        const status_id = POSTED;

        const commentsToRate = await getAllComments(status_id);

        let avg = await avgCountHelper(commentsToRate);

        if (+page === 0) page = 1;
        page = page - 1;

        let comments = await getAllComments(
            status_id,
            +(limit),
            limit * page
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
        commentsData.commentsCount = comments.length;
        commentsData.averageRate = avg;

        await res.json(commentsData);

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};

