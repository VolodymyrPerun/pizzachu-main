const router = require('express').Router();

const {USER_STATUS: {ACTIVE, BLOCKED}, JWT_METHOD: {CLIENT}} = require("../../constants");
const {
    authMiddleware: {
        checkAccessTokenMethodMiddleware,
        getUserFromAccessToken
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
    = require('../../middleware')

const {
    userController: {
        createUser,
        deleteUserByParams,
        getAllUsers,
        getUserById,
        updateUser
    }
} = require('../../controllers');

router.post('/register',
    checkUserValidityMiddleware,
    checkFilesMiddleware,
    checkUserPhotoCountMiddleware,
    createUser(CLIENT));

router.get('/getAllActiveUsers', getAllUsers(ACTIVE));
router.get('/getAllBlockedUsers', getAllUsers(BLOCKED));
router.get('/:userId', checkIsUserExistMiddleware, getUserById);
router.put('/update-profile/:userId',
    checkAccessTokenMethodMiddleware(CLIENT),
    getUserFromAccessToken,
    checkUserValidityIfUpdateMiddleware,
    updateUser);
router.delete('/delete-profile/:userId',
    checkAccessTokenMethodMiddleware(CLIENT),
    getUserFromAccessToken,
    deleteUserByParams);

module.exports = router;
