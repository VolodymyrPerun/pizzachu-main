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

productTypeRouter.post('/create-product-type',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    checkProductTypeValidityMiddleware,
    createProductType);
productTypeRouter.put('/update-product-type/:id',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    checkProductTypeValidityIfUpdateMiddleware,
    updateProductType);
productTypeRouter.delete('/delete-product-type/:id',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    deleteProductTypeByParams);
productTypeRouter.get('/get-all-product-types', getAllProductTypes);

module.exports = productTypeRouter;
