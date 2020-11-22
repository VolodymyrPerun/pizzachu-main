const productTypeRouter = require('express').Router();

const {
    JWT_METHOD: {ADMIN}
} = require('../../constants');
const {
    productTypeController: {
        createProductType,
        deleteProductTypeByParams,
        getAllProductTypes,
        updateProductType
    },
} = require('../../controllers');
const {
    authMiddleware: {checkAccessTokenMethodMiddleware, getUserFromAccessTokenMiddleware},
    productTypeMiddleware: {
        checkProductTypeValidityMiddleware,
        checkProductTypeValidityIfUpdateMiddleware,
        checkIsProductTypeExistMiddleware
    }
} = require('./../../middleware');


productTypeRouter.get('/', getAllProductTypes);
productTypeRouter.use('/',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware);
productTypeRouter.post('/',
    checkProductTypeValidityMiddleware,
    createProductType);
productTypeRouter.put('/:id',
    checkIsProductTypeExistMiddleware,
    checkProductTypeValidityIfUpdateMiddleware,
    updateProductType);
productTypeRouter.delete('/:id',
    checkIsProductTypeExistMiddleware,
    deleteProductTypeByParams);

module.exports = productTypeRouter;
