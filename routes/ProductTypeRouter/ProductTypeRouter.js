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
    adminMiddleware: {getAdminFromAccessTokenMiddleware},
    authMiddleware: {checkAccessTokenMethodMiddleware},
    productTypeMiddleware: {
        checkProductTypeValidityMiddleware,
        checkProductTypeValidityIfUpdateMiddleware
    }
} = require('./../../middleware');

productTypeRouter.post('/create-product-type',
    checkAccessTokenMethodMiddleware(ADMIN),
    getAdminFromAccessTokenMiddleware,
    checkProductTypeValidityMiddleware,
    createProductType);
productTypeRouter.put('/update-product-type/:id',
    checkAccessTokenMethodMiddleware(ADMIN),
    getAdminFromAccessTokenMiddleware,
    checkProductTypeValidityIfUpdateMiddleware,
    updateProductType);
productTypeRouter.delete('/delete-product-type/:id',
    checkAccessTokenMethodMiddleware(ADMIN),
    getAdminFromAccessTokenMiddleware,
    deleteProductTypeByParams);
productTypeRouter.get('/get-all-product-types', getAllProductTypes);

module.exports = productTypeRouter;
