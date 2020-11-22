const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {REPLY_COMMENT}} = require('../../constants');

module.exports = async (postedComment, transaction) => {
    const CommentModel = await db.getModel(REPLY_COMMENT);

    return CommentModel.create(postedComment,
        {
            new: true,
        }, transaction);
};
