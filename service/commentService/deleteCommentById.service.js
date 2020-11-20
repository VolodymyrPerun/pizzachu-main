const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {COMMENT}, COMMENT_STATUS: {DELETED}} = require('../../constants');

module.exports = async (id, transaction) => {
    const CommentModel = db.getModel(COMMENT);

    await CommentModel.update({
        status_id: DELETED
    }, {
        where: id,
        transaction
    });
};
