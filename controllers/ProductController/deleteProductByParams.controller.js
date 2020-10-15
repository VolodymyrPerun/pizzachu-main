const {
    responseStatusCodesEnum: {BAD_REQUEST},
    USER_ROLE: {ADMIN},
    USER_STATUS: {ACTIVE},
    PRODUCT_STATUS: {DELETED}
} = require('../../constants');
const {ErrorHandler, CustomErrorData: {BAD_REQUEST_PRODUCT_NOT_PRESENT}} = require("../../error");
const {
    productService: {deleteProductByParamsService, getProductByIdService}
} = require("../../service");


module.exports = async (req, res, next) => {
    try {

        const user = req.user;

        user.role_id = ADMIN;
        user.status_id = ACTIVE;

        const {productId} = req.params;
        const product = await getProductByIdService(productId);
        console.log(product);
        if (!product || product.status === DELETED) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_PRODUCT_NOT_PRESENT.message,
                BAD_REQUEST_PRODUCT_NOT_PRESENT.code));
        }

        await deleteProductByParamsService({productId});

        res.end();
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.code));
    }
};
