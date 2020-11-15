const {
    historyActionEnum: {getAllProductsHistory},
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET},
    PRODUCT_TYPE: {CHAINS, DESSERTS, DRINKS, MISO_SOUPS, PIZZA, ROLES, SALADS, SUPPLEMENTS, SUSHI}
} = require('../../constants');
const {ErrorHandler} = require("../../error");
const {productService: {getAllProductsByTypeService}} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(getAllProductsHistory);

module.exports = async (req, res, next) => {
    let cartData = {};
    try {
        const chains = await getAllProductsByTypeService(CHAINS);
        const desserts = await getAllProductsByTypeService(DESSERTS);
        const drinks = await getAllProductsByTypeService(DRINKS);
        const miso_soups = await getAllProductsByTypeService(MISO_SOUPS);
        const pizza = await getAllProductsByTypeService(PIZZA);
        const roles = await getAllProductsByTypeService(ROLES);
        const salads = await getAllProductsByTypeService(SALADS);
        const supplements = await getAllProductsByTypeService(SUPPLEMENTS);
        const sushi = await getAllProductsByTypeService(SUSHI);

        if (!chains || !desserts || !drinks || !miso_soups || !pizza || !roles || !salads || !supplements || !sushi) {
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

        cartData.CHAINS = chains;
        cartData.DESSERTS = desserts;
        cartData.DRINKS = drinks;
        cartData.MISO_SOUPS = miso_soups;
        cartData.PIZZA = pizza;
        cartData.ROLES = roles;
        cartData.SALADS = salads;
        cartData.SUPPLEMENTS = supplements;
        cartData.SUSHI = sushi;

        await res.json(cartData);

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};

