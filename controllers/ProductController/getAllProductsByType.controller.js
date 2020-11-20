const {
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET},
} = require('../../constants');
const {ErrorHandler} = require('../../error');
const {productService: {getAllProductsByTypeAndSection, getAllProductsByTypeOnly}} = require('../../service');

module.exports = async (req, res, next) => {
    let products = [];
    try {
        let {
            query: {type, section, limit, page},
        } = req;

        if (+page === 0) page = 1;
        page = page - 1;

        if (!section) {
            products = await getAllProductsByTypeOnly(
                type,
                +(limit),
                limit * page
            );
        } else {
            products = await getAllProductsByTypeAndSection(
                type,
                section,
                +(limit),
                limit * page);
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

