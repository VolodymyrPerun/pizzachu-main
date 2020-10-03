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
    userController: {
        deleteUserByParams
    }
} = require('../../controllers');


router.post('/registerAdmin', checkUserValidityMiddleware,
    checkFilesMiddleware,
    checkUserPhotoCountMiddleware, createAdmin);

// router.get('/getAllActiveUsers', getAllActiveUsers);
// router.get('/getAllBlockedUsers', getAllBlockedUsers);
// router.get('/:userId', checkIsUserExistMiddleware, getUserById);
// router.put('/:userId', checkIsUserExistMiddleware, checkUserValidityIfUpdateMiddleware, updateUser);
router.delete('/:userId', checkIsUserExistMiddleware, deleteUserByParams);

module.exports = router;
