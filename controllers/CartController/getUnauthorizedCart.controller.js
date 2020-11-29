const {calculateCartPriceHelper} = require("../../helpers");
const {ErrorHandler} = require("../../error");
const {productService: {getProductByIdService}} = require("../../service");

module.exports = async (req, res, next) => {
    let cartData = {};
    try {
        let products = [];
        let {
            query: {productId}
        } = req;

        console.log(productId);

        productId = productId.split(',');

        await Promise.all(productId.map(async productId => {
            let product = await getProductByIdService(productId);

            products.push(product);

            // return product
        }));

        // console.log(y);

        // const total = await calculateCartPriceHelper(products);
        //

        //
        cartData.products = products;
        // cartData.total = total;

        console.log(products);

        await res.json(cartData);

    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};

