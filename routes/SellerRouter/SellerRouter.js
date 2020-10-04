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
    sellerController: {
        createSeller
    },
    userController: {
        deleteUserByParams
    }
} = require('../../controllers');


router.post('/registerSeller', checkUserValidityMiddleware,
    checkFilesMiddleware,
    checkUserPhotoCountMiddleware, createSeller);

// router.get('/getAllActiveUsers', getAllActiveUsers);
// router.get('/getAllBlockedUsers', getAllBlockedUsers);
// router.get('/:userId', checkIsUserExistMiddleware, getUserById);
// router.put('/:userId', checkIsUserExistMiddleware, checkUserValidityIfUpdateMiddleware, updateUser);
// router.delete('/:userId', checkIsUserExistMiddleware, deleteUserByParams);

module.exports = router;
