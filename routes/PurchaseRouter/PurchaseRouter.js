const purchaseRouter = require('express').Router();

const {
    JWT_METHOD: {SELLER},
    PURCHASE_STATUS:{ACCEPTED, CANCELLED, IN_PROGRESS}
} = require('../../constants');
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

purchaseRouter.get('/accepted',
    getAllPurchases(ACCEPTED));

purchaseRouter.get('/cancelled',
    getAllPurchases(CANCELLED));

purchaseRouter.get('/in-progress',
    getAllPurchases(IN_PROGRESS));

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
