const {updateCartService} = require('../cartService');
const {calculateCartPriceHelper} = require('../../helpers');
const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {CART_PRODUCT, USER, USER_ROLE, USER_STATUS}} = require('../../constants');

module.exports = async (userCart, product, productCount, transaction) => {
    console.log('$$$$$$$$$$$$$$$');
    console.log(userCart);
    console.log('$$$$$$$$$$$$$$$');
    const productIndex = userCart.products.findIndex(value => {
        return product.productId.toString() === value.productId.toString();
    });

    if (productIndex !== -1) {
        userCart.products[productIndex].count += productCount;
    } else {
        userCart.products.push({
            count: productCount,
            productId: product.productId,
            price: product.price
        });
    }

    userCart.sum = calculateCartPriceHelper(userCart.products);

    return updateCartService(userCart, userCart.userId, transaction);


};
