const router = require('express').Router();

const {USER_ROLE: {ADMIN, SELLER}, JWT_TOKEN_TYPE: {ACCESS, REFRESH}} = require('../../constants');
const {
    authMiddleware: {
        checkAccessTokenMethodMiddleware,
        checkAdminAccessTokenMiddleware,
        checkSellerTokenMiddleware,
        checkUserAccessTokenMiddleware,
        checkAdminRefreshTokenMiddleware,
        checkSellerRefreshTokenMiddleware,
        checkUserRefreshTokenMiddleware,
        getUserFromRefreshToken,
        getUserFromAccessToken
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
    = require('../../middleware');

const {
    adminController: {
        createAdmin
    },
    authController: {
        authAdmin,
        authSeller,
        authUser,
        logoutUser
    },
    oAuthController:
        {
            refreshToken
        },
    userController: {
        deleteUserByParams
    }
} = require('../../controllers');


router.post('/register-admin', checkUserValidityMiddleware,
    checkFilesMiddleware,
    checkUserPhotoCountMiddleware, createAdmin);

router.post('/auth/auth-admin', authUser(ADMIN));
router.post('/auth/auth-seller', authUser(SELLER));
router.post('/auth/logout-admin', checkAdminAccessTokenMiddleware, logoutUser);
router.post('/auth/logout-admin1', checkAccessTokenMethodMiddleware(ADMIN), logoutUser);
router.post('/auth/logout-seller', logoutUser);
router.post('/auth-admin/refresh', checkAdminRefreshTokenMiddleware, refreshToken);


module.exports = router;
