const {
    historyActionEnum: {getAllProductTypesHistory},
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET}
} = require('../../constants');
const {ErrorHandler} = require("../../error");
const {productTypeService: {getAllProductTypesService}} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(getAllProductTypesHistory);

module.exports = async (req, res, next) => {
    let productTypes = [];
    try {

        productTypes = await getAllProductTypesService();

        if (!productTypes) {
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

        await res.json(productTypes).end();

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};

