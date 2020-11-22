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
        checkProductSectionValidityIfUpdateMiddleware,
        checkIsProductSectionExistMiddleware
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
    checkIsProductSectionExistMiddleware,
    checkProductSectionValidityIfUpdateMiddleware,
    updateProductSection);
productSectionRouter.delete('/:id',
    checkIsProductSectionExistMiddleware,
    deleteProductSectionByParams);

module.exports = productSectionRouter;
