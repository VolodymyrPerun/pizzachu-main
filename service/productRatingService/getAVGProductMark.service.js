const db = require('../../dataBase').getInstance();
const Sequelize = require('sequelize');
const {PRODUCT_RATING} = require("../../constants/dbTableName.enum");


module.exports = async productId => {
    const ProductRatingModel = db.getModel(PRODUCT_RATING);

    const avgMark = await ProductRatingModel.findOne({
        where :{
            productId
        },
        attributes: [
            [Sequelize.fn('AVG', Sequelize.col('mark')), 'average_product_mark']
        ]
    });

    return avgMark && avgMark.dataValues;
};
