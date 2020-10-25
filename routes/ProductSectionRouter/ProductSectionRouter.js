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
    adminMiddleware: {getAdminFromAccessTokenMiddleware},
    authMiddleware: {checkAccessTokenMethodMiddleware},
    productSectionMiddleware: {
        checkProductSectionValidityMiddleware,
        checkProductSectionValidityIfUpdateMiddleware
    }
} = require('./../../middleware');

productSectionRouter.post('/create-product-section',
    checkAccessTokenMethodMiddleware(ADMIN),
    getAdminFromAccessTokenMiddleware,
    checkProductSectionValidityMiddleware,
    createProductSection);
productSectionRouter.put('/update-product-section/:id',
    checkAccessTokenMethodMiddleware(ADMIN),
    getAdminFromAccessTokenMiddleware,
    checkProductSectionValidityIfUpdateMiddleware,
    updateProductSection);
productSectionRouter.delete('/delete-product-section/:id',
    checkAccessTokenMethodMiddleware(ADMIN),
    getAdminFromAccessTokenMiddleware,
    deleteProductSectionByParams);
productSectionRouter.get('/get-all-product-sections', getAllProductSections);

module.exports = productSectionRouter;
