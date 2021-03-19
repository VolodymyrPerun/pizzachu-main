const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    historyActionEnum: {deleteCommentHistory},
    responseStatusCodesEnum: {BAD_REQUEST},
    COMMENT_STATUS: {DELETED},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK}
} = require('../../constants');
const {ErrorHandler, CustomErrorData: {BAD_REQUEST_COMMENT_NOT_PRESENT}} = require("../../error");
const {
    historyService: {addEventService},
    repliedCommentService: {getRepliedCommentByIdService, deleteRepliedCommentById},
    userService: {getUserByIdService}
} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(deleteCommentHistory);

module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            id,
            user: {userId}
        } = req;

        const userFromDB = await getUserByIdService(userId);

        const CommentFromDB = await getRepliedCommentByIdService(id);

        if (!CommentFromDB || CommentFromDB.status_id === DELETED) {
            logger.error({
                message: BAD_REQUEST_COMMENT_NOT_PRESENT.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                BAD_REQUEST,
                BAD_REQUEST_COMMENT_NOT_PRESENT.message,
                BAD_REQUEST_COMMENT_NOT_PRESENT.customCode));
        }

        await deleteRepliedCommentById({id}, transaction);
        logger.info({
            info: deleteCommentHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            userId,
            email: userFromDB.email,
            productId: CommentFromDB.productId,
        });
        await addEventService({event: deleteCommentHistory, userId}, transaction);
        await transaction.commit();
        console.log(chalk.bgYellow.bold.cyan(TRANSACTION_COMMIT));

        res.end();
    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red(TRANSACTION_ROLLBACK));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
