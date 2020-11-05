const {Op} = require('sequelize');
const dayjs = require('dayjs');

const {oauthService: {deleteTokenByParamsService}} = require('../service');

module.exports = async () => {
    await deleteTokenByParamsService({
        createdAt: {
            [Op.lte]: dayjs().subtract(30, "day").format()
        }
    });
};
