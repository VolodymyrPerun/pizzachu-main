const db = require('../../dataBase').getInstance();
const {
    DB_TABLE_NAME: {COMMENT_STATUS, REPLY_COMMENT, USER},
} = require('../../constants');


module.exports = async (status_id, commentId, limit, offset) => {
    const CommentModel = await db.getModel(REPLY_COMMENT);
    const CommentStatusModel = await db.getModel(COMMENT_STATUS);
    const UserModel = await db.getModel(USER);

    return CommentModel.findAll({
        where: {status_id, commentId},
        raw: true,
        include: [
            {
                model: CommentStatusModel,
                attributes: ['status']
            },
            {
                model: UserModel,
                as: 'User',
                attributes: ['userId', 'name', 'surname', 'user_photo']
            }
        ],
        order: [
            ['id', 'DESC']
        ],
        limit,
        offset
    });
};

