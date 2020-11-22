const replyCommentRouter = require('express').Router();

const {
    replyCommentController: {
        deleteRepliedCommentById,
        editRepliedComment,
        getAllRepliedComments,
        postRepliedComment
    },
} = require('../../controllers');
const {
    authMiddleware: {getUserFromAccessTokenMiddleware},
    commentMiddleware: {
        checkIsCommentExistMiddleware,
        checkCommentValidityMiddleware,
        checkCommentValidityIfUpdateMiddleware,
        checkIsRepliedCommentExistMiddleware
    },
} = require('./../../middleware');

replyCommentRouter.get('/:id',
    checkIsCommentExistMiddleware,
    getAllRepliedComments);

replyCommentRouter.use('/:id',
    getUserFromAccessTokenMiddleware
);

replyCommentRouter.post('/:id',
    checkIsCommentExistMiddleware,
    checkCommentValidityMiddleware,
    postRepliedComment);

replyCommentRouter.put('/:id',
    checkIsRepliedCommentExistMiddleware,
    checkCommentValidityIfUpdateMiddleware,
    editRepliedComment);

replyCommentRouter.delete('/:id',
    checkIsRepliedCommentExistMiddleware,
    deleteRepliedCommentById);


module.exports = replyCommentRouter;
