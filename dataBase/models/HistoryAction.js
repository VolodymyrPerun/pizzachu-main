const {DB_TABLE_NAME: {HISTORY_ACTION}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const HistoryAction = sequelize.define(HISTORY_ACTION, {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        event: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            allowNull: false
        },
        create_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('now')
        }

    }, {
        tableName: HISTORY_ACTION,
        timestamps: false
    });

    const User = sequelize.import('./User.js');

    HistoryAction.belongsTo(User, {foreignKey: 'userId'});

    return HistoryAction;
};
