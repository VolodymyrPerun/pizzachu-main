const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    PRODUCT_TYPE: {CHAINS, DESSERTS, DRINKS, MISO_SOUPS, PIZZA, ROLES, SALADS, SUPPLEMENTS, SUSHI}
} = require('../../constants');
const {ErrorHandler} = require("../../error");
const {productService: {getAllProductsByTypeService}} = require("../../service");

module.exports = (productType) => async (req, res, next) => {
    const transaction = await transactionInstance();
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

        await transaction.commit();
        console.log(chalk.bgYellow.bold.cyan(TRANSACTION_COMMIT));

        await res.json(products).end();

    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red(TRANSACTION_ROLLBACK));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.code));
    }
};

