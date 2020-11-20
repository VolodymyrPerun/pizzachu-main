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
    authMiddleware: {checkAccessTokenMethodMiddleware, getUserFromAccessTokenMiddleware},
    productSectionMiddleware: {
        checkProductSectionValidityMiddleware,
        checkProductSectionValidityIfUpdateMiddleware
    }
} = require('./../../middleware');

productSectionRouter.get('/', getAllProductSections);
productSectionRouter.use('/',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware);
productSectionRouter.post('/',
    checkProductSectionValidityMiddleware,
    createProductSection);
productSectionRouter.put('/:id',
    checkProductSectionValidityIfUpdateMiddleware,
    updateProductSection);
productSectionRouter.delete('/:id',
    deleteProductSectionByParams);

module.exports = productSectionRouter;
