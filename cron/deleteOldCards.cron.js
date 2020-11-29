const {Op} = require('sequelize');
const dayjs = require('dayjs');

const {cartService: {deleteProductFromCartByParamsService}} = require("../service");

module.exports = async () => {

    await deleteProductFromCartByParamsService({
        created_at: {
            [Op.lte]: dayjs().subtract(3, "day").format()
        }
    });
};
