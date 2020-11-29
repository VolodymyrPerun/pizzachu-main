const {Op} = require('sequelize');
const dayjs = require('dayjs');

const {oauthService: {deleteTokenByParamsService}} = require('../service');

module.exports = async () => {
    await deleteTokenByParamsService({
        create_at: {
            [Op.lte]: dayjs().subtract(30, "day").format()
        }
    });
};
