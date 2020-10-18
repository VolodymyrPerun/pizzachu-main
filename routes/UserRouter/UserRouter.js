const router = require('express').Router();

const {USER_STATUS: {ACTIVE, BLOCKED}} = require("../../constants");
const {
    authMiddleware: {
        checkUserAccessTokenMiddleware,
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


router.post('/register', checkUserValidityMiddleware,
    checkFilesMiddleware,
    checkUserPhotoCountMiddleware,
    createUser);

router.get('/getAllActiveUsers', getAllUsers(ACTIVE));
router.get('/getAllBlockedUsers', getAllUsers(BLOCKED));
router.get('/:userId', checkIsUserExistMiddleware, getUserById);
router.put('/update-profile/:userId',
    checkUserAccessTokenMiddleware,
    getUserFromAccessToken,
    checkUserValidityIfUpdateMiddleware,
    updateUser);
router.delete('/delete-profile/:userId',
    checkUserAccessTokenMiddleware,
    getUserFromAccessToken,
    deleteUserByParams);

module.exports = router;
