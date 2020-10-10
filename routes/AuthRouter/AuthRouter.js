const router = require('express').Router();

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
            authClient,
            logoutUser,
            refreshToken,
            changePassword
        }
} = require('../../controllers')

router.post('/', authClient);
router.post('/logout', checkUserAccessTokenMiddleware, logoutUser);
router.post('/refresh', checkUserRefreshTokenMiddleware, refreshToken);
router.put(
    '/password-change',
    // accessTokenChecker,
    // getUserFromAccessToken,
    changePassword
);

module.exports = router;
