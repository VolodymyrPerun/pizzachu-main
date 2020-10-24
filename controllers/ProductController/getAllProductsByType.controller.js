const {
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET},
    PRODUCT_TYPE: {CHAINS, DESSERTS, DRINKS, MISO_SOUPS, PIZZA, ROLES, SALADS, SUPPLEMENTS, SUSHI}
} = require('../../constants');
const {ErrorHandler} = require("../../error");
const {productService: {getAllProductsByTypeService}} = require("../../service");

module.exports = (productType) => async (req, res, next) => {
    let keyType = '';
    let products = [];

    try {
        switch (productType) {
            case CHAINS:
                keyType = CHAINS
                break;
            case DESSERTS:
                keyType = DESSERTS
                break;
            case DRINKS:
                keyType = DRINKS
                break;
            case MISO_SOUPS:
                keyType = MISO_SOUPS
                break;
            case PIZZA:
                keyType = PIZZA
                break;
            case ROLES:
                keyType = ROLES
                break;
            case SALADS:
                keyType = SALADS
                break;
            case SUPPLEMENTS:
                keyType = SUPPLEMENTS
                break;
            case SUSHI:
                keyType = SUSHI
                break;
            default:
                return next(new ErrorHandler(NOT_FOUND_CODE, NOT_GET.message, NOT_GET.customCode));
        }

        products = await getAllProductsByTypeService([keyType]);

        if (!products) return next(new ErrorHandler(NOT_FOUND_CODE, NOT_GET.message, NOT_GET.customCode));

        await res.json(products).end();

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.code));
    }
};

