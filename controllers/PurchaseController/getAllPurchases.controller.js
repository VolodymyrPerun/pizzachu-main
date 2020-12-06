const {
    historyActionEnum: {getAllPurchasesHistory},
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET},
    PURCHASE_STATUS: {DONE},
    USER_ROLE: {SELLER, CLIENT}
} = require('../../constants');
const {ErrorHandler} = require("../../error");
const {purchaseService: {getPurchaseService}} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(getAllPurchasesHistory);

module.exports = userRole => async (req, res, next) => {
    let purchaseData = {};
    let purchases = [];
    try {

        let {
            user: {userId},
            query: {status_id, limit, page}
        } = req;

        if (+page === 0) page = 1;
        page = page - 1;

        switch (userRole) {
            case CLIENT:
                purchases = await getPurchaseService(
                    {
                        status_id: DONE,
                        userId
                    },
                    +(limit),
                    limit * page
                );
                break;

            case SELLER:
                purchases = await getPurchaseService(
                    {status_id},
                    +(limit),
                    limit * page
                );
                break;

            default:
                return next(new ErrorHandler(
                    NOT_FOUND_CODE,
                    NOT_GET.message,
                    NOT_GET.customCode));
        }

        if (!purchases) {
            logger.error({
                message: NOT_GET.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                NOT_FOUND_CODE,
                NOT_GET.message,
                NOT_GET.customCode));
        }

        if (purchases[0] !== undefined) {

            purchaseData.purchase = purchases;
            purchaseData.lenght = purchases.length;
            purchaseData.total = purchases[0].total;

            await res.json(purchaseData);

        } else {
            return next(new ErrorHandler(
                NOT_FOUND_CODE,
                NOT_GET.message,
                NOT_GET.customCode));
        }

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};

