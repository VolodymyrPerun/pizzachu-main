const {PRODUCT_RATING} = require("../../constants/dbTableName.enum");
const db = require('../../dataBase').getInstance();


module.exports = async markData => {

    const ProductRatingModel = db.getModel(PRODUCT_RATING);

    await ProductRatingModel.create(markData);
};
