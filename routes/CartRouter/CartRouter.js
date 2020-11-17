const cartRouter = require('express').Router();

const {
    cartController: {
        addProductToCart,
        deleteCartByUserId,
        deleteProductFromCartByParams,
        getCart,
        updateProductInCart
    }
} = require('../../controllers');
const {
    authMiddleware: {getUserForPurchaseMiddleware},
    cartMiddleware: {checkProductInCartValidityMiddleware, checkProductInCartValidityIfUpdateMiddleware},
    productMiddleware: {checkIsProductExistMiddleware,}
} = require('./../../middleware');


cartRouter.use('/',
    getUserForPurchaseMiddleware);

cartRouter.get('/',
    getCart);
cartRouter.delete('/',
    deleteCartByUserId);

cartRouter.use('/:productId',
    checkIsProductExistMiddleware);

cartRouter.delete('/:productId',
    deleteProductFromCartByParams);
cartRouter.post('/:productId',
    checkProductInCartValidityMiddleware,
    addProductToCart);
cartRouter.put('/:productId',
    checkProductInCartValidityIfUpdateMiddleware,
    updateProductInCart);

module.exports = cartRouter;
