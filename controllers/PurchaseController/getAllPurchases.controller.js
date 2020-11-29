const {
    historyActionEnum: {getAllPurchasesHistory},
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET},
    PURCHASE_STATUS: {ACCEPTED, CANCELLED, IN_PROGRESS}
} = require('../../constants');
const {ErrorHandler} = require("../../error");
const {purchaseService: {getPurchaseService}} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(getAllPurchasesHistory);

module.exports = purchaseStatus => async (req, res, next) => {
    let purchaseData = {};
    let purchases = [];
    let keyRole = '';
    try {
        switch (purchaseStatus) {
            case ACCEPTED:
                keyRole = ACCEPTED;
                break;
            case CANCELLED:
                keyRole = CANCELLED;
                break;
            case IN_PROGRESS:
                keyRole = IN_PROGRESS;
                break;
            default:
                return next(new ErrorHandler(
                    NOT_FOUND_CODE,
                    NOT_GET.message,
                    NOT_GET.customCode));
        }
        let {
            query: {limit, page},
        } = req;

        if (+page === 0) page = 1;
        page = page - 1;

        purchases = await getPurchaseService(
            {status_id: keyRole},
            +(limit),
            limit * page
        );

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

        purchaseData.purchase = purchases;
        purchaseData.lenght = purchases.length;
        purchaseData.total = purchases[0].total;

        await res.json(purchaseData);

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};

