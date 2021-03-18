const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {REPLY_COMMENT, COMMENT_STATUS, USER}} = require('../../constants');

module.exports = async id => {
    const CommentModel = await db.getModel(REPLY_COMMENT);
    const CommentStatusModel = await db.getModel(COMMENT_STATUS);
    const UserModel = await db.getModel(USER);

    return CommentModel.findOne({
        where: {
            id
        },
        include: [
            {
                model: CommentStatusModel,
                attributes: ['status']
            },
            {
                model: UserModel,
                as:'User',
                attributes: ['userId', 'name', 'surname', 'user_photo']
            }
        ],
        raw: true
    });
};
