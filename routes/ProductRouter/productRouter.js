const productRouter = require('express').Router();
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
    authMiddleware: {checkAdminAccessTokenMiddleware},
    fileMiddleware: {checkFilesMiddleware, checkUserPhotoCountMiddleware},
    productMiddleware: {
        checkProductValidityMiddleware,
        checkProductValidityIfUpdateMiddleware}
} = require('./../../middleware');

productRouter.post('/createProduct',
    checkAdminAccessTokenMiddleware,
    getAdminFromAccessTokenMiddleware,
    checkProductValidityMiddleware,
    checkFilesMiddleware,
    checkUserPhotoCountMiddleware,
    createProduct);
productRouter.put('/update-product/:productId',
    checkAdminAccessTokenMiddleware,
    getAdminFromAccessTokenMiddleware,
    checkProductValidityIfUpdateMiddleware,
    updateProduct);
productRouter.delete('/delete-product/:productId',
    checkAdminAccessTokenMiddleware,
    getAdminFromAccessTokenMiddleware,
    deleteProductByParams);
// productRouter.get('/topClothes', getAllTopClothes)
// productRouter.get('/bottomClothes', getAllBottomClothes)
// productRouter.get('/underwearClothes', getAllUnderwearClothes);
// productRouter.get('/generalClothes', getAllGeneralClothes);

module.exports = productRouter;
