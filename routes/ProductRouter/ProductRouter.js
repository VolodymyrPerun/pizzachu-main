const productRouter = require('express').Router();

const {
    PRODUCT_TYPE: {CHAINS, DESSERTS, DRINKS, MISO_SOUPS, PIZZA, ROLES, SALADS, SUPPLEMENTS, SUSHI},
    JWT_METHOD: {ADMIN}
} = require('../../constants');
const {
    productController: {
        createProduct,
        deleteProductByParams,
        getAllProducts,
        updateProduct,
        getAllProductsByType
    },
} = require('../../controllers');
const {
    adminMiddleware: {getUserFromAccessTokenMiddleware},
    authMiddleware: {checkAccessTokenMethodMiddleware},
    fileMiddleware: {checkFilesMiddleware, checkUserPhotoCountMiddleware},
    productMiddleware: {
        checkProductValidityMiddleware,
        checkProductValidityIfUpdateMiddleware
    }
} = require('./../../middleware');

productRouter.post('/create-product',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    checkProductValidityMiddleware,
    checkFilesMiddleware,
    checkUserPhotoCountMiddleware,
    createProduct);
productRouter.put('/update-product/:productId',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    checkProductValidityIfUpdateMiddleware,
    updateProduct);
productRouter.delete('/delete-product/:productId',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    deleteProductByParams);
productRouter.get('/get-all-products', getAllProducts);
productRouter.get('/chains', getAllProductsByType(CHAINS));
productRouter.get('/desserts', getAllProductsByType(DESSERTS));
productRouter.get('/drinks',getAllProductsByType(DRINKS));
productRouter.get('/miso-soups', getAllProductsByType(MISO_SOUPS));
productRouter.get('/pizza', getAllProductsByType(PIZZA));
productRouter.get('/roles',getAllProductsByType(ROLES));
productRouter.get('/salads', getAllProductsByType(SALADS));
productRouter.get('/supplements', getAllProductsByType(SUPPLEMENTS));
productRouter.get('/sushi', getAllProductsByType(SUSHI));

module.exports = productRouter;
