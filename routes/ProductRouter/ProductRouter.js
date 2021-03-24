const productRouter = require('express').Router();

const {
    JWT_METHOD: {ADMIN, CLIENT}
} = require('../../constants');
const {
    productController: {
        createProduct,
        deleteProductByParams,
        updateProduct,
        getAllProductsByType,
        getProductById
    },
    userController: {
        getAverageMark,
        evaluateProduct,
        getIsEvaluateForUser
    }
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


productRouter.post(
    '/evaluate-product',
    checkAccessTokenMethodMiddleware(CLIENT),
    getUserFromAccessTokenMiddleware,
    evaluateProduct
);
productRouter.get(
    '/is-evaluated',
    checkAccessTokenMethodMiddleware(CLIENT),
    getUserFromAccessTokenMiddleware,
    getIsEvaluateForUser
);
productRouter.get(
    '/average-mark',
    getAverageMark
);
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
productRouter.get('/:productId', getProductById);
productRouter.get('/', getAllProductsByType);

module.exports = productRouter;
