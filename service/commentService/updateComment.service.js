const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {COMMENT}} = require('../../constants');

module.exports = async (id, updatedComment, transaction) => {
    const CommentModel = await db.getModel(COMMENT);

    return CommentModel.update(updatedComment, {
        where: {id},
        returning: true,
        plain: true,
        transaction
    });
};
