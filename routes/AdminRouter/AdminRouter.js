const router = require('express').Router();
const {
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
    = require('../../middleware')

const {
    adminController: {
        createAdmin
    },
    authController: {
        loginAdmin,
        loginSeller
    },
    userController: {
        deleteUserByParams
    }
} = require('../../controllers');


router.post('/registerAdmin', checkUserValidityMiddleware,
    checkFilesMiddleware,
    checkUserPhotoCountMiddleware, createAdmin);

router.post('/authAdmin', loginAdmin);
router.post('/authSeller', loginSeller);
// router.post('/logout', checkAccessTokenMiddleware, logoutUser);
// router.post('/refresh', checkRefreshTokenMiddleware, refreshToken);

// router.get('/getAllActiveUsers', getAllActiveUsers);
// router.get('/getAllBlockedUsers', getAllBlockedUsers);
// router.get('/:userId', checkIsUserExistMiddleware, getUserById);
// router.put('/:userId', checkIsUserExistMiddleware, checkUserValidityIfUpdateMiddleware, updateUser);
// router.delete('/:userId', checkIsUserExistMiddleware, deleteUserByParams);

module.exports = router;
