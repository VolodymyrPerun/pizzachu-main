const router = require('express').Router();

const {USER_ROLE: {SELLER}} = require('../../constants');
const {
    userMiddleware:
        {
            checkUserValidityMiddleware,
        },
    fileMiddleware:
        {
            checkFilesMiddleware,
            checkUserPhotoCountMiddleware
        }
}
    = require('../../middleware');

const {
    userController: {
        createUser
    }
} = require('../../controllers');

router.post('/',
    checkUserValidityMiddleware,
    checkFilesMiddleware,
    checkUserPhotoCountMiddleware,
    createUser(SELLER));

module.exports = router;
