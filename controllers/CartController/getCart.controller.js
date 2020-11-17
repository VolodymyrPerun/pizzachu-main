const {
    historyActionEnum: {getAllProductTypesHistory},
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET}
} = require('../../constants');
const {ErrorHandler} = require("../../error");
const {cartService: {getCartService}} = require("../../service");
const winston = require('../../logger/winston');
const {calculateCartPriceHelper} = require("../../helpers");
const logger = winston(getAllProductTypesHistory);

module.exports = async (req, res, next) => {
    let cartData = {};
    try {
        const {
            user: {userId}
        } = req;

        const cart = await getCartService({userId});

        if (!cart) {
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

        const total = await calculateCartPriceHelper(cart);

        cartData.cart = cart;
        cartData.total = total;

        await res.json(cartData);

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};

