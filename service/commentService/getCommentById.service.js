const db = require('../../dataBase').getInstance();

const {DB_TABLE_NAME: {COMMENT, COMMENT_STATUS}} = require('../../constants');

module.exports = async id => {
    const CommentModel = await db.getModel(COMMENT);
    const CommentStatusModel = await db.getModel(COMMENT_STATUS);

    return CommentModel.findAll({
        where: {id},
        include: [{
            model: CommentStatusModel,
            attributes: ['status']
        }],
        raw: true
    });
};
