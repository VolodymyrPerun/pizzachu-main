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
            loginClient,
            logoutUser,
            refreshToken
        }
} = require('../../controllers')

router.post('/', loginClient);
router.post('/logout', checkUserAccessTokenMiddleware, logoutUser);
router.post('/refresh', checkUserRefreshTokenMiddleware, refreshToken);

module.exports = router;
