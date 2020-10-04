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
            loginAdmin,
            loginClient,
            loginSeller,
            logoutUser,
            refreshToken
        }
} = require('../../controllers')

router.post('/', loginAdmin);
router.post('/', loginClient);
router.post('/', loginSeller);
router.post('/logout', checkAccessTokenMiddleware, logoutUser);
router.post('/refresh', checkRefreshTokenMiddleware, refreshToken);

module.exports = router;
