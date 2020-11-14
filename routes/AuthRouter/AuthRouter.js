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
            getUserProfileFromAccessToken,
            refreshToken
        }
} = require('../../controllers');

router.post('/admin', authUser(ADMIN));
router.post('/client', authUser(CLIENT));
router.post('/seller', authUser(SELLER));
router.post('/logout-admin', checkAccessTokenMethodMiddleware(ADMIN), logoutUser);
router.post('/logout-client', checkAccessTokenMethodMiddleware(CLIENT), logoutUser);
router.post('/logout-seller', checkAccessTokenMethodMiddleware(SELLER), logoutUser);
router.post('/refresh-admin',
    checkRefreshTokenMethodMiddleware(ADMIN),
    getUserFromRefreshTokenMiddleware,
    refreshToken(ADMIN));
router.post('/refresh-client',
    getUserFromRefreshTokenMiddleware,
    refreshToken(CLIENT));
router.post('/refresh-seller',
    getUserFromRefreshTokenMiddleware,
    refreshToken(SELLER));
router.put(
    '/admin/password-change',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    changePassword
);
router.put(
    '/client/password-change',
    checkAccessTokenMethodMiddleware(CLIENT),
    getUserFromAccessTokenMiddleware,
    changePassword
);
router.put(
    '/seller/password-change',
    checkAccessTokenMethodMiddleware(SELLER),
    getUserFromAccessTokenMiddleware,
    changePassword
);
router.get('/me',
    checkAccessTokenMethodMiddleware(CLIENT),
    getUserFromAccessTokenMiddleware,
    getUserProfileFromAccessToken
);

module.exports = router;
