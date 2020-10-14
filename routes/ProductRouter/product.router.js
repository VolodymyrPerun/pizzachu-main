const productRouter = require('express').Router();
const {
    productController: {
        createProduct,
        updateProduct,
        deleteProduct,
        getAllTopClothes,
        getAllBottomClothes,
        getAllUnderwearClothes,
        getAllGeneralClothes,
    }
} = require('../../controllers');
const {
    authMiddleware: {checkAdminAccessTokenMiddleware, getUserFromAccessToken},
    fileMiddleware: {checkFilesMiddleware, checkUserPhotoCountMiddleware},
    productMiddleware: {checkIsProductExistMiddleware, checkProductValidityMiddleware}
} = require('./../../middleware');

productRouter.post('/createProduct',
    checkAdminAccessTokenMiddleware,
    getUserFromAccessToken,
    checkProductValidityMiddleware,
    checkFilesMiddleware,
    checkUserPhotoCountMiddleware,
    createProduct);
// productRouter.put('/:product_id', checkAccessToken, getUserFromAccessToken, checkIsAdmin, getProductByParams,
//     updateProduct);
// productRouter.delete('/:product_id', checkAccessToken, getUserFromAccessToken, checkIsAdmin, getProductByParams,
//     deleteProduct);
// productRouter.get('/topClothes', getAllTopClothes)
// productRouter.get('/bottomClothes', getAllBottomClothes)
// productRouter.get('/underwearClothes', getAllUnderwearClothes);
// productRouter.get('/generalClothes', getAllGeneralClothes);


module.exports = productRouter;
