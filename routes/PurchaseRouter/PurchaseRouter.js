const {ADMIN} = require("../../constants/jwtMethod.enum");
const purchaseRouter = require('express').Router();

const {JWT_METHOD: {CLIENT, SELLER}} = require('../../constants');
const {
    purchaseController: {
        acceptPurchase,
        addPurchase,
        addUnauthorizedPurchase,
        cancelPurchase,
        donePurchase,
        editPurchase,
        getAllPurchases

    }
} = require('../../controllers');
const {
    authMiddleware: {checkAccessTokenMethodMiddleware, getUserFromAccessTokenMiddleware},
    purchaseMiddleware: {
        checkIsPurchaseExistMiddleware,
        checkUnauthorizedPurchaseValidityMiddleware,
        checkPurchaseValidityIfEditMiddleware
    }
} = require('./../../middleware');

purchaseRouter.post('/unauthorized',
    checkUnauthorizedPurchaseValidityMiddleware,
    addUnauthorizedPurchase);

purchaseRouter.use('/',
    getUserFromAccessTokenMiddleware
);

purchaseRouter.post('/',
    getUserFromAccessTokenMiddleware,
    checkUnauthorizedPurchaseValidityMiddleware,
    addPurchase);


purchaseRouter.get('/seller',
    getUserFromAccessTokenMiddleware,
    getAllPurchases(SELLER));

purchaseRouter.get('/client',
    getUserFromAccessTokenMiddleware,
    getAllPurchases(CLIENT));

purchaseRouter.get('/admin',
    getUserFromAccessTokenMiddleware,
    getAllPurchases(ADMIN));


purchaseRouter.use('/',
    checkAccessTokenMethodMiddleware(SELLER),
    checkIsPurchaseExistMiddleware
);

purchaseRouter.put('/edit-purchase',
    checkPurchaseValidityIfEditMiddleware,
    editPurchase);
purchaseRouter.post('/accept-purchase',
    acceptPurchase);
purchaseRouter.post('/cancel-purchase',
    cancelPurchase);
purchaseRouter.post('/done-purchase',
    donePurchase);

module.exports = purchaseRouter;
