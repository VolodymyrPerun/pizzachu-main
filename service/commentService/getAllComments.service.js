const db = require('../../dataBase').getInstance();
const {
    DB_TABLE_NAME: {COMMENT, COMMENT_STATUS, USER},
} = require('../../constants');

module.exports = async (status_id, productId, limit, offset) => {
    const CommentModel = await db.getModel(COMMENT);
    const CommentStatusModel = await db.getModel(COMMENT_STATUS);
    const UserModel = await db.getModel(USER);

    return CommentModel.findAll({
        where: {
            status_id,
            productId
        },
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

