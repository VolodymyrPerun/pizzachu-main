const {DB_TABLE_NAME: {COMMENT_STATUS}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const CommentStatus = sequelize.define(COMMENT_STATUS, {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: COMMENT_STATUS,
        timestamps: false
    });

    return CommentStatus;
};
