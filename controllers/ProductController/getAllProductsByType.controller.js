const {
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET},
} = require('../../constants');
const {ErrorHandler} = require("../../error");
const {productService: {getAllProductsByTypeAndSection, getAllProductsByTypeOnly}} = require("../../service");

module.exports = async (req, res, next) => {
    let products = [];
    try {
        const {
            query: {type, section},
        } = req;

        if (!section) {
            products = await getAllProductsByTypeOnly(type);
        } else {
            products = await getAllProductsByTypeAndSection(type, section);
        }

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

        await res.json(products);

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};

