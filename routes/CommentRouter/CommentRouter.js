const commentRouter = require('express').Router();

const {
    commentController: {
        deleteCommentById,
        getAllComments,
        postComment,
        updateComment
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

commentRouter.post('/:productId',
    checkCommentValidityMiddleware,
    checkIsProductExistMiddleware,
    postComment);

commentRouter.put('/:id',
    checkIsCommentExistMiddleware,
    checkCommentValidityIfUpdateMiddleware,
    updateComment);
commentRouter.delete('/:id',
    checkIsCommentExistMiddleware,
    deleteCommentById);


module.exports = commentRouter;
