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
    userController: {
        createUser,
        deleteUserByParams,
        getAllActiveUsers,
        getAllBlockedUsers,
        getUserById,
        updateUser
    }
} = require('../../controllers');


router.post('/register',checkUserValidityMiddleware,
    checkFilesMiddleware,
    checkUserPhotoCountMiddleware,
    createUser);

router.get('/getAllActiveUsers', getAllActiveUsers);
router.get('/getAllBlockedUsers', getAllBlockedUsers);
router.get('/:userId', checkIsUserExistMiddleware, getUserById);
router.put('/:userId', checkIsUserExistMiddleware, checkUserValidityIfUpdateMiddleware, updateUser);
router.delete('/:userId', checkIsUserExistMiddleware, deleteUserByParams);

module.exports = router;
