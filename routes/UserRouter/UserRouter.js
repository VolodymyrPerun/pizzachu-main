const {getUserByAT, updateUserPhoto} = require("../../controllers/UserController");
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
    createUser(CLIENT));

router.put('/update-user-photo',
    checkAccessTokenMethodMiddleware(CLIENT),
    getUserFromAccessTokenMiddleware,
     checkFilesMiddleware,
    checkUserPhotoCountMiddleware,
    updateUserPhoto);

router.get('/active', getAllUsers(ACTIVE));
router.get('/blocked', getAllUsers(BLOCKED));
router.get('/:userId',
    checkAccessTokenMethodMiddleware(CLIENT),
    getUserFromAccessTokenMiddleware,
    checkIsUserExistMiddleware,
    getUserById);
router.get('/',
    checkAccessTokenMethodMiddleware(CLIENT),
    getUserFromAccessTokenMiddleware,
    getUserByAT);
router.put('/update-profile',
    checkAccessTokenMethodMiddleware(CLIENT),
    getUserFromAccessTokenMiddleware,
    checkUserValidityIfUpdateMiddleware,
    updateUser);
router.delete('/:userId',
    checkAccessTokenMethodMiddleware(CLIENT),
    getUserFromAccessTokenMiddleware,
    deleteUserByParams);

module.exports = router;
