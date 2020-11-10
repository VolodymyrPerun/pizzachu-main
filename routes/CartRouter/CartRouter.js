const cartRouter = require('express').Router();

const {
    JWT_METHOD: {CLIENT}
} = require('../../constants');
const {
    cartController: {
        createCart
    }
} = require('../../controllers');
const {
    adminMiddleware:{getUserFromAccessTokenMiddleware},
    authMiddleware: {checkAccessTokenMethodMiddleware},
    productSectionMiddleware: {
        checkProductSectionValidityMiddleware,
        checkProductSectionValidityIfUpdateMiddleware
    },
    userMiddleware: {checkIsUserExistMiddleware}
} = require('./../../middleware');

cartRouter.post('/create-cart/:productId',
    checkAccessTokenMethodMiddleware(CLIENT),
    getUserFromAccessTokenMiddleware,
    // checkProductSectionValidityMiddleware,
    createCart);
// productSectionRouter.put('/update-product-section/:id',
//     checkAccessTokenMethodMiddleware(ADMIN),
//     getAdminFromAccessTokenMiddleware,
//     checkProductSectionValidityIfUpdateMiddleware,
//     updateProductSection);
// productSectionRouter.delete('/delete-product-section/:id',
//     checkAccessTokenMethodMiddleware(ADMIN),
//     getAdminFromAccessTokenMiddleware,
//     deleteProductSectionByParams);
// productSectionRouter.get('/get-all-product-sections', getAllProductSections);

module.exports =  cartRouter;
