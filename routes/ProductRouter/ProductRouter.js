const productRouter = require('express').Router();

const {
    JWT_METHOD: {ADMIN}
} = require('../../constants');
const {
    productController: {
        createProduct,
        deleteProductByParams,
        updateProduct,
        getAllProductsByType
    },
} = require('../../controllers');
const {
    authMiddleware: {checkAccessTokenMethodMiddleware, getUserFromAccessTokenMiddleware},
    fileMiddleware: {checkFilesMiddleware, checkUserPhotoCountMiddleware},
    productMiddleware: {
        checkProductValidityMiddleware,
        checkProductValidityIfUpdateMiddleware,
        checkIsProductExistMiddleware
    }
} = require('./../../middleware');

productRouter.post('/',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    checkProductValidityMiddleware,
    checkFilesMiddleware,
    checkUserPhotoCountMiddleware,
    createProduct);
productRouter.put('/:productId',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    checkIsProductExistMiddleware,
    checkProductValidityIfUpdateMiddleware,
    updateProduct);
productRouter.delete('/:productId',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    checkIsProductExistMiddleware,
    deleteProductByParams);
productRouter.get('/', getAllProductsByType);

module.exports = productRouter;
