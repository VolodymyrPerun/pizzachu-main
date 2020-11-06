const {
    historyActionEnum: {getAllProductSectionsHistory},
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET}
} = require('../../constants');
const {ErrorHandler} = require("../../error");
const {productSectionService: {getAllProductSectionsService}} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(getAllProductSectionsHistory);

module.exports = async (req, res, next) => {
    let productSections = [];
    try {

        productSections = await getAllProductSectionsService();

        if (!productSections) {
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

        await res.json(productSections).end();

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};

