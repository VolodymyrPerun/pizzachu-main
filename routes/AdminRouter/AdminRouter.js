const router = require('express').Router();
const {
    authMiddleware: {
        checkAdminTokenMiddleware,
        checkSellerTokenMiddleware,
        checkUserAccessTokenMiddleware,
        checkAdminRefreshTokenMiddleware,
        checkSellerRefreshTokenMiddleware,
        checkUserRefreshTokenMiddleware,
        getUserFromRefreshToken,
        getUserFromToken
    },
    userMiddleware:
        {

            checkIsUserExistMiddleware,
            checkUserValidityMiddleware,
            checkUserValidityIfUpdateMiddleware
        },
    fileMiddleware:
        {
            checkFilesMiddleware,
            checkUserPhotoCountMiddleware
        }
}
    = require('../../middleware')

const {
    adminController: {
        createAdmin
    },
    authController: {
        authAdmin,
        authSeller,
        logoutUser,
        refreshToken
    },
    userController: {
        deleteUserByParams
    }
} = require('../../controllers');


router.post('/registerAdmin', checkUserValidityMiddleware,
    checkFilesMiddleware,
    checkUserPhotoCountMiddleware, createAdmin);

router.post('/authAdmin', authAdmin);
router.post('/authAdmin/logout', logoutUser);
router.post('/authAdmin/refresh', checkAdminRefreshTokenMiddleware, refreshToken);

router.post('/authSeller', authSeller);
router.post('/authSeller/logout', logoutUser);
router.post('/authSeller/refresh', checkSellerRefreshTokenMiddleware, refreshToken);

router.use(checkAdminTokenMiddleware, checkSellerTokenMiddleware, checkUserAccessTokenMiddleware);

router.use('/users/:user_id', checkUserValidityMiddleware);
// router.post('/logout', checkAccessTokenMiddleware, logoutUser);
// router.post('/refresh', checkRefreshTokenMiddleware, refreshToken);

// router.get('/getAllActiveUsers', getAllActiveUsers);
// router.get('/getAllBlockedUsers', getAllBlockedUsers);
// router.get('/:userId', checkIsUserExistMiddleware, getUserById);
// router.put('/:userId', checkIsUserExistMiddleware, checkUserValidityIfUpdateMiddleware, updateUser);
// router.delete('/:userId', checkIsUserExistMiddleware, deleteUserByParams);

module.exports = router;
