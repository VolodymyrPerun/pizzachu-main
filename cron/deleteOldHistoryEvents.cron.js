const {Op} = require('sequelize');
const dayjs = require('dayjs');

const {historyService: {deleteOldHistoryEventsCronService}} = require("../service");

module.exports = async () => {

    await deleteOldHistoryEventsCronService({
        create_at: {
            [Op.lte]: dayjs().subtract(3, "year").format()
        }
    });
};
