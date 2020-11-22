const db = require('../../dataBase').getInstance();
const {
    DB_TABLE_NAME: {COMMENT_STATUS, REPLY_COMMENT},
} = require('../../constants');

module.exports = async (status_id, commentId) => {
    const CommentModel = await db.getModel(REPLY_COMMENT);
    const CommentStatusModel = await db.getModel(COMMENT_STATUS);

    return CommentModel.findAll({
        where: {status_id, commentId},
        raw: true,
        include: [
            {
                model: CommentStatusModel,
                attributes: ['status']
            }
        ],
        order: [
            ['id', 'DESC']
        ]
    });
};

