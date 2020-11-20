const {DB_TABLE_NAME: {REPLY_COMMENT}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const ReplyComment = sequelize.define(REPLY_COMMENT, {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        status_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: REPLY_COMMENT,
        timestamps: false
    });

    const CommentStatus = sequelize.import('./CommentStatus');

    ReplyComment.belongsTo(CommentStatus, {foreignKey: 'status_id'});

    return ReplyComment;
};
