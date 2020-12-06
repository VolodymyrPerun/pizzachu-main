const cartRouter = require('express').Router();

const {
    cartController: {
        addProductToCart,
        addProductToUnauthorizedCart,
        deleteCartByUserId,
        deleteProductFromCartByParams,
        deleteProductFromUnauthorizedCartByParams,
        deleteUnauthorizedCartByTempId,
        getCart,
        getUnauthorizedCart,
        updateProductInCart,
        updateProductInUnauthorizedCart
    }
} = require('../../controllers');
const {
    authMiddleware: {getUserFromAccessTokenMiddleware},
    cartMiddleware: {checkProductInCartValidityMiddleware, checkProductInCartValidityIfUpdateMiddleware},
    productMiddleware: {checkIsProductExistMiddleware}
} = require('./../../middleware');


cartRouter.get('/unauthorized',
    getUnauthorizedCart);

cartRouter.delete('/unauthorized',
    deleteUnauthorizedCartByTempId);


cartRouter.delete('/',
    checkIsProductExistMiddleware,
    deleteProductFromUnauthorizedCartByParams);
cartRouter.post('/unauthorized',
    checkIsProductExistMiddleware,
    checkProductInCartValidityMiddleware,
    addProductToUnauthorizedCart);
cartRouter.put('/unauthorized',
    checkIsProductExistMiddleware,
    checkProductInCartValidityIfUpdateMiddleware,
    updateProductInUnauthorizedCart);


cartRouter.use('/',
    getUserFromAccessTokenMiddleware
);

cartRouter.get('/',
    getCart);
cartRouter.delete('/',
    deleteCartByUserId);

cartRouter.use('/',
    checkIsProductExistMiddleware);

cartRouter.delete('/',
    deleteProductFromCartByParams);
cartRouter.post('/',
    checkProductInCartValidityMiddleware,
    addProductToCart);
cartRouter.put('/',
    checkProductInCartValidityIfUpdateMiddleware,
    updateProductInCart);

module.exports = cartRouter;
