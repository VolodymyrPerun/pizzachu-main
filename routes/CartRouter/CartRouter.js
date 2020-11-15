const cartRouter = require('express').Router();

const {
    JWT_METHOD: {CLIENT}
} = require('../../constants');
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
    adminMiddleware: {getUserFromAccessTokenMiddleware},
    authMiddleware: {checkAccessTokenMethodMiddleware},
    cartMiddleware: {checkProductInCartValidityMiddleware, checkProductInCartValidityIfUpdateMiddleware},
    productMiddleware: {checkIsProductExistMiddleware,}
} = require('./../../middleware');


cartRouter.use('/',
    checkAccessTokenMethodMiddleware(CLIENT),
    getUserFromAccessTokenMiddleware);

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
