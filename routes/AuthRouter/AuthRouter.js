const router = require('express').Router();

const {USER_ROLE: {ADMIN, CLIENT, SELLER}} = require('../../constants');
const {
    authMiddleware:
        {
            checkAccessTokenMethodMiddleware,
            checkRefreshTokenMethodMiddleware,
            getUserFromRefreshToken
        }
} = require("../../middleware");
const {
    authController:
        {
            authUser,
            logoutUser,
            changePassword
        },
    oAuthController:
        {
            refreshToken
        }
} = require('../../controllers');

router.post('/auth-admin', authUser(ADMIN));
router.post('/auth-client', authUser(CLIENT));
router.post('/auth-seller', authUser(SELLER));
router.post('/logout-admin', checkAccessTokenMethodMiddleware(ADMIN), logoutUser);
router.post('/logout-client', checkAccessTokenMethodMiddleware(CLIENT), logoutUser);
router.post('/logout-seller', checkAccessTokenMethodMiddleware(SELLER), logoutUser);
router.post('/auth-admin/refresh',
    checkRefreshTokenMethodMiddleware(ADMIN),
    getUserFromRefreshToken,
    refreshToken(ADMIN));
router.post('/auth-client/refresh',
    getUserFromRefreshToken,
    refreshToken(CLIENT));
router.post('/auth-seller/refresh',
    getUserFromRefreshToken,
    refreshToken(SELLER));
router.put(
    '/password-change',
    // accessTokenChecker,
    // getUserFromAccessToken,
    changePassword
);

module.exports = router;
