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
    adminMiddleware: {getUserFromAccessTokenMiddleware},
    authMiddleware: {checkAccessTokenMethodMiddleware},
    productTypeMiddleware: {
        checkProductTypeValidityMiddleware,
        checkProductTypeValidityIfUpdateMiddleware
    }
} = require('./../../middleware');

productTypeRouter.post('/',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    checkProductTypeValidityMiddleware,
    createProductType);
productTypeRouter.put('/:id',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    checkProductTypeValidityIfUpdateMiddleware,
    updateProductType);
productTypeRouter.delete('/:id',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    deleteProductTypeByParams);
productTypeRouter.get('/', getAllProductTypes);

module.exports = productTypeRouter;
