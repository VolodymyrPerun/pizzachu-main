const purchaseRouter = require('express').Router();

const {JWT_METHOD: {CLIENT, SELLER}} = require('../../constants');
const {
    purchaseController: {
        acceptPurchase,
        addPurchase,
        cancelPurchase,
        getAllPurchases

    }
} = require('../../controllers');
const {
    authMiddleware: {checkAccessTokenMethodMiddleware, getUserFromAccessTokenMiddleware},
    cartMiddleware: {checkProductInCartValidityMiddleware, checkProductInCartValidityIfUpdateMiddleware},
    productMiddleware: {checkIsProductExistMiddleware},
    purchaseMiddleware: {checkIsPurchaseExistMiddleware, checkUnauthorizedPurchaseValidityMiddleware}
} = require('./../../middleware');

purchaseRouter.use('/',
    getUserFromAccessTokenMiddleware
);

purchaseRouter.get('/admin',
    getAllPurchases(SELLER));

purchaseRouter.get('/client',
    getAllPurchases(CLIENT));

// purchaseRouter.get('/getUnauthorizedCart',
//     getUnauthorizedCart);
//
// purchaseRouter.delete('/',
//     deleteCartByUserId);

// purchaseRouter.use('/:productId',
//     checkIsProductExistMiddleware);

// purchaseRouter.delete('/:productId',
//     deleteProductFromCartByParams);
purchaseRouter.post('/',
    // checkProductInCartValidityMiddleware,
    addPurchase);
purchaseRouter.post('/accept-purchase',
    checkAccessTokenMethodMiddleware(SELLER),
    checkIsPurchaseExistMiddleware,
    acceptPurchase);
purchaseRouter.post('/cancel-purchase',
    checkAccessTokenMethodMiddleware(SELLER),
    checkIsPurchaseExistMiddleware,
    cancelPurchase);

module.exports = purchaseRouter;
