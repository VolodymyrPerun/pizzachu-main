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
        commentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
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
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('now')
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('now')
        }
    }, {
        tableName: REPLY_COMMENT,
        timestamps: false
    });

    const CommentStatus = sequelize.import('./CommentStatus');
    const Comment = sequelize.import('./Comment');
    const User = sequelize.import('./User');

    ReplyComment.belongsTo(Comment, {foreignKey: 'commentId'});
    ReplyComment.belongsTo(CommentStatus, {foreignKey: 'status_id'});
    ReplyComment.belongsTo(User, {foreignKey: 'userId'});

    return ReplyComment;
};
