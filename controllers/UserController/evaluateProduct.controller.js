const Joi = require('joi');
const {CREATED, FORBIDDEN} = require("../../constants/responseStatusCodes.enum");
const {setProductMark} = require("../../service/productRatingService");
const {ErrorHandler} = require("../../error");
const {productMarkValidationSchema} = require("../../validators/productMarkValidator");


module.exports = async (req, res, next) => {
    try {

        const {
            body: evaluatedData,
            user: {userId},
            query: {productId}
        } = req;

        evaluatedData.userId = userId;
        evaluatedData.productId = productId;
        evaluatedData.isEvaluated = true;

        const validatedProductMark = Joi.validate(evaluatedData, productMarkValidationSchema);

        if (validatedProductMark.error) {

            return next(new ErrorHandler(
                FORBIDDEN,
                validatedProductMark.error.details[0].message));
        }

        await setProductMark(evaluatedData);

        res.status(CREATED).end();

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.code));
    }
};
