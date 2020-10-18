const router = require('express').Router();

const {
    userMiddleware:
        {
            checkUserValidityMiddleware
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
        createAdmin
    }
} = require('../../controllers');


router.post('/register-admin', checkUserValidityMiddleware,
    checkFilesMiddleware,
    checkUserPhotoCountMiddleware, createAdmin);

module.exports = router;
