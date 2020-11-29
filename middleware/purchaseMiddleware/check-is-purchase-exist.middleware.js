const {ErrorHandler, CustomErrorData: {BAD_REQUEST_PURCHASE_IS_NOT_PRESENT}} = require('../../error');
const {purchaseService: {getPurchaseService}} = require("../../service");
const {responseStatusCodesEnum: {BAD_REQUEST}, PURCHASE_STATUS: {CANCELLED}} = require("../../constants");

module.exports = async (req, res, next) => {
    try {
        const {
            query: {purchaseId}
        } = req;

        if (isNaN(purchaseId) || +purchaseId < 0) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_PURCHASE_IS_NOT_PRESENT.message,
                BAD_REQUEST_PURCHASE_IS_NOT_PRESENT.customCode
            ));
        }

        const purchase = await getPurchaseService({purchaseId});

        if (!purchase || purchase.status_id === CANCELLED) {
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_PURCHASE_IS_NOT_PRESENT.message,
                BAD_REQUEST_PURCHASE_IS_NOT_PRESENT.customCode
            ));
        }

        req.purchase = purchase;

        next();
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
