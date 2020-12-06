const cartRouter = require('express').Router();

const {
    cartController: {
        addProductToCart,
        addProductToUnauthorizedCart,
        deleteCartByUserId,
        deleteProductFromCartByParams,
        getCart,
        getUnauthorizedCart,
        updateProductInCart
    }
} = require('../../controllers');
const {
    authMiddleware: {getUserFromAccessTokenMiddleware},
    cartMiddleware: {checkProductInCartValidityMiddleware, checkProductInCartValidityIfUpdateMiddleware},
    productMiddleware: {checkIsProductExistMiddleware}
} = require('./../../middleware');


cartRouter.use('/',
    getUserFromAccessTokenMiddleware
);

cartRouter.get('/',
    getCart);
cartRouter.get('/getUnauthorizedCart',
    getUnauthorizedCart);

cartRouter.delete('/',
    deleteCartByUserId);

cartRouter.use('/',
    checkIsProductExistMiddleware);

cartRouter.delete('/:productId',
    deleteProductFromCartByParams);
cartRouter.post('/',
    checkProductInCartValidityMiddleware,
    addProductToCart);
cartRouter.post('/unauthorized',
    checkProductInCartValidityMiddleware,
    addProductToUnauthorizedCart);
cartRouter.put('/:productId',
    checkProductInCartValidityIfUpdateMiddleware,
    updateProductInCart);

module.exports = cartRouter;
