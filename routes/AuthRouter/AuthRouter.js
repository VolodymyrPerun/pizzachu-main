const router = require('express').Router();

const {
    authMiddleware:
        {
            checkAccessTokenMiddleware,
            checkRefreshTokenMiddleware
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
router.post('/logout', checkAccessTokenMiddleware, logoutUser);
router.post('/refresh', checkRefreshTokenMiddleware, refreshToken);

module.exports = router;
