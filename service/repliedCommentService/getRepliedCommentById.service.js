const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {REPLY_COMMENT, COMMENT_STATUS}} = require('../../constants');

module.exports = async id => {
    const CommentModel = await db.getModel(REPLY_COMMENT);
    const CommentStatusModel = await db.getModel(COMMENT_STATUS);

    return CommentModel.findOne({
        where: {
            id
        },
        include: [{
            model: CommentStatusModel,
            attributes: ['status']
        }],
        raw: true
    });
};
