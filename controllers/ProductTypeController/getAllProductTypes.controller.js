const {
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_GET}
} = require('../../constants');
const {ErrorHandler} = require("../../error");
const {productTypeService: {getAllProductTypesService}} = require("../../service");

module.exports = async (req, res, next) => {
    let productTypes = [];
    try {

        productTypes = await getAllProductTypesService();

        if (!productTypes) return next(new ErrorHandler(NOT_FOUND_CODE, NOT_GET.message, NOT_GET.customCode));

        await res.json(productTypes).end();

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};

