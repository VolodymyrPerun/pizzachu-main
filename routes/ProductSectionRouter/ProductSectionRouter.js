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

productSectionRouter.post('/',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    checkProductSectionValidityMiddleware,
    createProductSection);
productSectionRouter.put('/:id',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    checkProductSectionValidityIfUpdateMiddleware,
    updateProductSection);
productSectionRouter.delete('/:id',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    deleteProductSectionByParams);
productSectionRouter.get('/', getAllProductSections);

module.exports = productSectionRouter;
