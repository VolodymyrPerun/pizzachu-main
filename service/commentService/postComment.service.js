const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {COMMENT}} = require('../../constants');

module.exports = async (postedComment, transaction) => {
    const CommentModel = await db.getModel(COMMENT);

    return CommentModel.create(postedComment,
        {
            new: true,
        }, transaction);
};
