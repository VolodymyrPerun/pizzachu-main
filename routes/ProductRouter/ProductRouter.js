const productRouter = require('express').Router();

const {JWT_METHOD: {ADMIN}} = require('../../constants')
const {
    productController: {
        createProduct,
        deleteProductByParams,
        updateProduct,
        getAllTopClothes,
        getAllBottomClothes,
        getAllUnderwearClothes,
        getAllGeneralClothes,
    }
} = require('../../controllers');
const {
    adminMiddleware: {getAdminFromAccessTokenMiddleware},
    authMiddleware: {checkAccessTokenMethodMiddleware},
    fileMiddleware: {checkFilesMiddleware, checkUserPhotoCountMiddleware},
    productMiddleware: {
        checkProductValidityMiddleware,
        checkProductValidityIfUpdateMiddleware
    }
} = require('./../../middleware');

productRouter.post('/createProduct',
    checkAccessTokenMethodMiddleware(ADMIN),
    getAdminFromAccessTokenMiddleware,
    checkProductValidityMiddleware,
    checkFilesMiddleware,
    checkUserPhotoCountMiddleware,
    createProduct);
productRouter.put('/update-product/:productId',
    checkAccessTokenMethodMiddleware(ADMIN),
    getAdminFromAccessTokenMiddleware,
    checkProductValidityIfUpdateMiddleware,
    updateProduct);
productRouter.delete('/delete-product/:productId',
    checkAccessTokenMethodMiddleware(ADMIN),
    getAdminFromAccessTokenMiddleware,
    deleteProductByParams);
// productRouter.get('/topClothes', getAllTopClothes)
// productRouter.get('/bottomClothes', getAllBottomClothes)
// productRouter.get('/underwearClothes', getAllUnderwearClothes);
// productRouter.get('/generalClothes', getAllGeneralClothes);

module.exports = productRouter;
