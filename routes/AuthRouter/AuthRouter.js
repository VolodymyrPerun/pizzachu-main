const router = require('express').Router();

const {USER_ROLE: {ADMIN, CLIENT, SELLER}} = require('../../constants');
const {
    authMiddleware:
        {
            checkAccessTokenMethodMiddleware,
            checkRefreshTokenMethodMiddleware,
            getUserFromAccessTokenMiddleware,
            getUserFromRefreshTokenMiddleware
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
    getUserFromRefreshTokenMiddleware,
    refreshToken(ADMIN));
router.post('/auth-client/refresh',
    getUserFromRefreshTokenMiddleware,
    refreshToken(CLIENT));
router.post('/auth-seller/refresh',
    getUserFromRefreshTokenMiddleware,
    refreshToken(SELLER));
router.put(
    '/auth-admin/password-change',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    changePassword
);
router.put(
    '/auth-client/password-change',
    checkAccessTokenMethodMiddleware(CLIENT),
    getUserFromAccessTokenMiddleware,
    changePassword
);
router.put(
    '/auth-seller/password-change',
    checkAccessTokenMethodMiddleware(SELLER),
    getUserFromAccessTokenMiddleware,
    changePassword
);

module.exports = router;
