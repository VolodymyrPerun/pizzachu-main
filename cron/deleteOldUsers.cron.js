const {Op} = require('sequelize');
const dayjs = require('dayjs');

const {userService: {deleteOldUserByParamsCronService}} = require("../service");

module.exports = async () => {

    await deleteOldUserByParamsCronService({
        create_at: {
            [Op.lte]: dayjs().subtract(1, "year").format()
        }
    });
};
