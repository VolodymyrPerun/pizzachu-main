const router = require('express').Router();

const {USER_STATUS: {ACTIVE, BLOCKED}, JWT_METHOD: {CLIENT}} = require("../../constants");
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

router.post('/',
    checkUserValidityMiddleware,
    checkFilesMiddleware,
    checkUserPhotoCountMiddleware,
    createUser(CLIENT));

router.get('/active', getAllUsers(ACTIVE));
router.get('/blocked', getAllUsers(BLOCKED));
router.get('/:userId',
    checkAccessTokenMethodMiddleware(CLIENT),
    getUserFromAccessTokenMiddleware,
    checkIsUserExistMiddleware,
    getUserById);
router.put('/',
    checkAccessTokenMethodMiddleware(CLIENT),
    getUserFromAccessTokenMiddleware,
    checkUserValidityIfUpdateMiddleware,
    updateUser);
router.delete('/:userId',
    checkAccessTokenMethodMiddleware(CLIENT),
    getUserFromAccessTokenMiddleware,
    deleteUserByParams);

module.exports = router;
