const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {HISTORY_ACTION}} = require('../../constants');

module.exports = async (historyObj, transaction) => {
    const HistoryModel = await db.getModel(HISTORY_ACTION);

    return HistoryModel.create(historyObj, {
        transaction
    });
};
