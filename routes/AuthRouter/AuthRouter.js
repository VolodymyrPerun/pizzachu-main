const router = require('express').Router();

const {USER_ROLE: {CLIENT}} = require('../../constants');
const {
    authMiddleware:
        {
            checkUserAccessTokenMiddleware,
            checkUserRefreshTokenMiddleware
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

router.post('/auth-client', authUser(CLIENT));
router.post('/logout-client', checkUserAccessTokenMiddleware, logoutUser);
router.post('/refresh', checkUserRefreshTokenMiddleware, refreshToken);
router.put(
    '/password-change',
    // accessTokenChecker,
    // getUserFromAccessToken,
    changePassword
);

module.exports = router;
