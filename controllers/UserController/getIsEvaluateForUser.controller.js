const {ErrorHandler} = require("../../error");
const {CREATED} = require("../../constants/responseStatusCodes.enum");
const {getIsUserEvaluate} = require("../../service/productRatingService");


module.exports = async (req, res, next) => {
    try {

        const {
            user: {userId},
            query: {productId}
        } = req;

        console.log(userId, productId);

        const isEvaluated = await getIsUserEvaluate(userId,productId);

        res.status(CREATED).json(isEvaluated);

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.code));
    }
};
