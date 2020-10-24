const router = require('express').Router();

const {JWT_METHOD: {ADMIN}} = require("../../constants");
const {
    authMiddleware: {
        checkAccessTokenMethodMiddleware,
        getUserFromAccessTokenMiddleware
    },
    userMiddleware:
        {
            checkIsUserExistMiddleware,
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
        blockUser,
        unBlockUser
    },
    userController: {
        createUser,
        updateUser
    }
} = require('../../controllers');

router.post('/register-admin',
    checkUserValidityMiddleware,
    checkFilesMiddleware,
    checkUserPhotoCountMiddleware,
    createUser(ADMIN));
router.put('/update-profile/:userId',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    checkUserValidityIfUpdateMiddleware,
    updateUser);
router.put('/users/:userId/block-user',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    checkIsUserExistMiddleware,
    blockUser);
router.put('/users/:userId/unblock-user',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware,
    checkIsUserExistMiddleware,
    unBlockUser);


module.exports = router;
