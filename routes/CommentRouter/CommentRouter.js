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

commentRouter.post('/:productId',
    checkCommentValidityMiddleware,
    checkIsProductExistMiddleware,
    postComment);

commentRouter.put('/:id',
    checkIsCommentExistMiddleware,
    checkCommentValidityIfUpdateMiddleware,
    editComment);
commentRouter.delete('/:id',
    checkIsCommentExistMiddleware,
    deleteCommentById);


module.exports = commentRouter;
