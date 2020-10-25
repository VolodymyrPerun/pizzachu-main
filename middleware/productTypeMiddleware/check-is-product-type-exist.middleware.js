const {ErrorHandler, CustomErrorData: {BAD_REQUEST_PRODUCT_NOT_PRESENT}} = require('../../error');
const {productTypeService: {getProductTypeByIdService}} = require("../../service");
const {responseStatusCodesEnum: {BAD_REQUEST}} = require("../../constants");

module.exports = async (req, res, next) => {
    try {
        const {id} = req.params;

        if (isNaN(id) || +id < 0) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_PRODUCT_NOT_PRESENT.message,
                BAD_REQUEST_PRODUCT_NOT_PRESENT.customCode
            ));
        }

        const productType = await getProductTypeByIdService(id);

        if (!productType) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_PRODUCT_NOT_PRESENT.message,
                BAD_REQUEST_PRODUCT_NOT_PRESENT.customCode
            ));
        }

        req.productType = productType;

        next();
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
