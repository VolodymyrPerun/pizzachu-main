const {
    historyActionEnum: {getAllProductsHistory},
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET}
} = require('../../constants');
const {ErrorHandler} = require("../../error");
const {productService: {getAllProductsService}} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(getAllProductsHistory);

module.exports = async (req, res, next) => {
    let products = [];
    try {
        products = await getAllProductsService();

        if (!products) {
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

        await res.json(products).end();

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};

