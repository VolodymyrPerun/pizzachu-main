const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {HISTORY_ACTION}} = require('../../constants');

module.exports = async create_at => {
    const HistoryModel = await db.getModel(HISTORY_ACTION);

    await HistoryModel.destroy( {
        where: create_at
    });
};
