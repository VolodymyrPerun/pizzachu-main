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


replyCommentRouter.get('/',
    getAllRepliedComments);

replyCommentRouter.use('/',
    getUserFromAccessTokenMiddleware
);

replyCommentRouter.post('/',
    checkIsCommentExistMiddleware,
    checkCommentValidityMiddleware,
    postRepliedComment
);

replyCommentRouter.put('/',
    checkIsRepliedCommentExistMiddleware,
    checkCommentValidityIfUpdateMiddleware,
    editRepliedComment
);

replyCommentRouter.delete('/',
    checkIsRepliedCommentExistMiddleware,
    deleteRepliedCommentById);


module.exports = replyCommentRouter;
