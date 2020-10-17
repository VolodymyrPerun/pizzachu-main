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
    authMiddleware: {checkAdminAccessTokenMiddleware, getUserFromAccessToken},
    fileMiddleware: {checkFilesMiddleware, checkUserPhotoCountMiddleware},
    productMiddleware: {checkIsProductExistMiddleware, checkProductValidityMiddleware}
} = require('./../../middleware');

productRouter.post('/createProduct',
    checkAdminAccessTokenMiddleware,
    getAdminFromAccessTokenMiddleware,
    checkProductValidityMiddleware,
    checkFilesMiddleware,
    checkUserPhotoCountMiddleware,
    createProduct);
// productRouter.put('/:product_id', checkAccessToken, getUserFromAccessToken, checkIsAdmin, getProductByParams,
//     updateProduct);
productRouter.delete('/:productId',
    checkAdminAccessTokenMiddleware,
    getAdminFromAccessTokenMiddleware,
    deleteProductByParams);
// productRouter.get('/topClothes', getAllTopClothes)
// productRouter.get('/bottomClothes', getAllBottomClothes)
// productRouter.get('/underwearClothes', getAllUnderwearClothes);
// productRouter.get('/generalClothes', getAllGeneralClothes);


module.exports = productRouter;
