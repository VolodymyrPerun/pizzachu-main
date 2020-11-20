const {ErrorHandler, CustomErrorData: {BAD_REQUEST_PRODUCT_NOT_PRESENT}} = require('../../error');
const {productService: {getProductByIdService}} = require("../../service");
const {responseStatusCodesEnum: {BAD_REQUEST}, PRODUCT_STATUS: {DELETED}} = require("../../constants");

module.exports = async (req, res, next) => {
    try {
        const {
            params: {productId}
        } = req;

        if (isNaN(productId) || +productId < 0) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_PRODUCT_NOT_PRESENT.message,
                BAD_REQUEST_PRODUCT_NOT_PRESENT.customCode
            ));
        }

        const product = await getProductByIdService(productId);

        if (!product || product.status_id === DELETED) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_PRODUCT_NOT_PRESENT.message,
                BAD_REQUEST_PRODUCT_NOT_PRESENT.customCode
            ));
        }

        req.product = product;

        next();
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
