const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {REPLY_COMMENT}, COMMENT_STATUS: {DELETED}} = require('../../constants');

module.exports = async (id, transaction) => {
    const CommentModel = db.getModel(REPLY_COMMENT);

    await CommentModel.update({
        status_id: DELETED
    }, {
        where: id,
        transaction
    });
};
