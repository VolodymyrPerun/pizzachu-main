const {PRODUCT_RATING} = require("../../constants/dbTableName.enum");
const db = require('../../dataBase').getInstance();


module.exports = async (userId, productId) => {
    const ProductRatingModel = db.getModel(PRODUCT_RATING);

    const isEvaluated = await ProductRatingModel.findOne({
        where: {
            userId,
            productId
        }
    });
    if (!isEvaluated) {
        return false;
    }
    return true;
};
