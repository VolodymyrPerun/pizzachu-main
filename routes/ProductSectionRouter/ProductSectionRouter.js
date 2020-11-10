const productSectionRouter = require('express').Router();

const {
    JWT_METHOD: {ADMIN}
} = require('../../constants');
const {
    productSectionController: {
        createProductSection,
        deleteProductSectionByParams,
        getAllProductSections,
        updateProductSection
    },
} = require('../../controllers');
const {
    adminMiddleware: {getUserFromAccessTokenMiddleware},
    authMiddleware: {checkAccessTokenMethodMiddleware},
    productSectionMiddleware: {
        checkProductSectionValidityMiddleware,
        checkProductSectionValidityIfUpdateMiddleware
    }
} = require('./../../middleware');

productSectionRouter.post('/create-product-section',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    checkProductSectionValidityMiddleware,
    createProductSection);
productSectionRouter.put('/update-product-section/:id',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    checkProductSectionValidityIfUpdateMiddleware,
    updateProductSection);
productSectionRouter.delete('/delete-product-section/:id',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    deleteProductSectionByParams);
productSectionRouter.get('/get-all-product-sections', getAllProductSections);

module.exports = productSectionRouter;
