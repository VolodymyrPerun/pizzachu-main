const {
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET},
} = require('../../constants');
const {ErrorHandler} = require('../../error');
const {
    productService:
        {
            getAllProductsByTypeOnly,
            getAllProductsByTypeAndSection,
            getAllProductsByTypeAndSectionWithPageLimit,
            getAllProductsByTypeOnlyWithPageLimit
        }
} = require('../../service');

module.exports = async (req, res, next) => {
    let productsData = {};
    let products = [];
    let noLimitsPageProducts = [];
    try {
        let {
            query: {type, section, size_id, limit, page},
        } = req;

        if (+page === 0) page = 1;
        page = page - 1;

        if (!section) {
            products = await getAllProductsByTypeOnlyWithPageLimit(
                type,
                size_id,
                +(limit),
                limit * page);

            noLimitsPageProducts = await getAllProductsByTypeOnly(type, size_id);

        } else {
            products = await getAllProductsByTypeAndSectionWithPageLimit(
                type,
                section,
                size_id,
                +(limit),
                limit * page);

            noLimitsPageProducts = await getAllProductsByTypeAndSection(type, section, size_id);

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

        let total = noLimitsPageProducts.length;

        productsData.products = products;
        productsData.total = total;

        await res.json(productsData);

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};

