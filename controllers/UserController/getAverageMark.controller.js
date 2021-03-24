const {ErrorHandler} = require("../../error");
const {CREATED} = require("../../constants/responseStatusCodes.enum");
const {getAVGProductMark} = require("../../service/productRatingService");


module.exports = async (req, res, next) => {
    try {
        const {query: {productId}} = req;

        const avgMark = await getAVGProductMark(productId);

        res.status(CREATED).json(avgMark);

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.code))
    }
};
