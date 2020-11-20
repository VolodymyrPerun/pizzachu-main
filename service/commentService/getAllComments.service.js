const db = require('../../dataBase').getInstance();
const {
    DB_TABLE_NAME: {COMMENT, COMMENT_STATUS, REPLY_COMMENT},
} = require('../../constants');

module.exports = async (status_id, limit, offset) => {
    const CommentModel = await db.getModel(COMMENT);
    const CommentStatusModel = await db.getModel(COMMENT_STATUS);
    const ReplyCommentModel = await db.getModel(REPLY_COMMENT);

    return CommentModel.findAll({
        where: {status_id},
        raw: true,
        include: [
            {
                model: CommentStatusModel,
                attributes: ['status']
            },
            {
                model: ReplyCommentModel
            }
        ],
        order: [
            ['id', 'DESC']
        ],
        limit,
        offset
    });
};

