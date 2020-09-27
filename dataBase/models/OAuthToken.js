const {DB_TABLE_NAME:{OAUTH_TOKEN}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {

    const OAuthToken = sequelize.define(OAUTH_TOKEN, {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            access_token: {
                type: DataTypes.STRING,
                allowNull: false
            },
            refresh_token: {
                type: DataTypes.STRING,
                allowNull: false
            },
            create_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.fn('now')
            }
        },
        {
            tableName: 'oauth_token',
            timestamps: false
        })

    const User = sequelize.import('./User.js')

OAuthToken.belongsTo(User, {foreignKey: 'userId'})

    return OAuthToken;
};
