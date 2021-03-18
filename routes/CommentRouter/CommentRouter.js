const commentRouter = require('express').Router();

const {
    commentController: {
        deleteCommentById,
        getAllComments,
        postComment,
        editComment
    },
} = require('../../controllers');
const {
    authMiddleware: {getUserFromAccessTokenMiddleware},
    commentMiddleware: {
        checkCommentValidityIfUpdateMiddleware,
        checkCommentValidityMiddleware,
        checkIsCommentExistMiddleware
    },
    productMiddleware: {checkIsProductExistMiddleware}
} = require('./../../middleware');


commentRouter.get('/', getAllComments);

commentRouter.use('/',
    getUserFromAccessTokenMiddleware
);

commentRouter.post('/',
    checkCommentValidityMiddleware,
    checkIsProductExistMiddleware,
    postComment);

commentRouter.put('/',
    checkCommentValidityIfUpdateMiddleware,
    checkIsCommentExistMiddleware,
    editComment);
commentRouter.delete('/',
    checkIsCommentExistMiddleware,
    deleteCommentById);


module.exports = commentRouter;
