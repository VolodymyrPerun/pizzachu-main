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
        unlockUser
    },
    userController: {
        createUser,
        updateUser
    }
} = require('../../controllers');

router.post('/',
    checkUserValidityMiddleware,
    checkFilesMiddleware,
    checkUserPhotoCountMiddleware,
    createUser(ADMIN));

router.use('/',
    checkAccessTokenMethodMiddleware(ADMIN),
    getUserFromAccessTokenMiddleware);

router.put('/:userId',
    checkUserValidityIfUpdateMiddleware,
    updateUser);
router.put('/block/:userId',
    checkIsUserExistMiddleware,
    blockUser);
router.put('/unlock/:userId',
    checkIsUserExistMiddleware,
    unlockUser);

module.exports = router;
