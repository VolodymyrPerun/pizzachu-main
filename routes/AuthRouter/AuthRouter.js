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
            loginUser,
            logoutUser,
            refreshToken
        }
} = require('../../controllers')


router.post('/', loginUser);
router.post('/logout', checkAccessTokenMiddleware, logoutUser);
router.post('/refresh', checkRefreshTokenMiddleware, refreshToken);

module.exports = router;
