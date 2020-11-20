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
        checkProductTypeValidityIfUpdateMiddleware
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
    checkProductTypeValidityIfUpdateMiddleware,
    updateProductType);
productTypeRouter.delete('/:id',
    deleteProductTypeByParams);

module.exports = productTypeRouter;
