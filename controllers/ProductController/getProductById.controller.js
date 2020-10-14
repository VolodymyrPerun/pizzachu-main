const {
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET}
} = require('../../constants');
const {ErrorHandler} = require("../../error");
const {productService: {getProductByIdService}} = require("../../service");

module.exports = async (req, res, next) => {

    try {
        const {productId} = req.params;

        const product = await getProductByIdService(productId);


        if (!product) return next(new ErrorHandler(NOT_FOUND_CODE, NOT_GET.message, NOT_GET.customCode));

        await res.json(product).end();

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.code));
    }

};

