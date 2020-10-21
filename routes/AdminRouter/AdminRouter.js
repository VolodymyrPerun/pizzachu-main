const router = require('express').Router();

const {JWT_METHOD: {ADMIN}} = require("../../constants");
const {
    authMiddleware: {
        checkAccessTokenMethodMiddleware,
        getUserFromAccessToken
    },
    userMiddleware:
        {
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

    },
    userController: {
        createUser,
        updateUser
    }
} = require('../../controllers');

router.post('/register-admin', checkUserValidityMiddleware,
    checkFilesMiddleware,
    checkUserPhotoCountMiddleware, createUser(ADMIN));
router.put('/update-profile/:userId',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessToken,
    checkUserValidityIfUpdateMiddleware,
    updateUser);

module.exports = router;
