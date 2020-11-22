const {DB_TABLE_NAME: {COMMENT}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(COMMENT, {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rate: {
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
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
        tableName: COMMENT,
        timestamps: false
    });

    const CommentStatus = sequelize.import('./CommentStatus');
    const Product = sequelize.import('./Product');
    const User = sequelize.import('./User');

    Comment.belongsTo(CommentStatus, {foreignKey: 'status_id'});
    Comment.belongsTo(Product, {foreignKey: 'productId'});
    Comment.belongsTo(User, {foreignKey: 'userId'});

    return Comment;
};
