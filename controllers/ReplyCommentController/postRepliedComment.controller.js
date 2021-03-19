const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    historyActionEnum: {postCommentHistory},
    responseStatusCodesEnum: {CREATED, NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_CREATED},
    COMMENT_STATUS: {POSTED},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
} = require('../../constants');
const {ErrorHandler} = require("../../error");
const {
    historyService: {addEventService},
    repliedCommentService: {postRepliedCommentService},
    userService: {getUserByIdService}
} = require("../../service");
const winston = require('../../logger/winston');
const logger = winston(postCommentHistory);


module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            comment: {text},
            id: commentId,
            user: {userId},
        } = req;

        const userFromDB = await getUserByIdService(userId);

        const isCommentCreated = await postRepliedCommentService(
            {
                text,
                commentId,
                status_id: POSTED,
                userId,
            },
            transaction);

        if (!isCommentCreated) {
            logger.error({
                message: NOT_CREATED.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                NOT_FOUND_CODE,
                NOT_CREATED.message,
                NOT_CREATED.customCode));
        }

        logger.info({
            info: postCommentHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            userId,
            email: userFromDB.email
        });

        await addEventService({event: postCommentHistory, userId}, transaction);
        await transaction.commit();
        console.log(chalk.bgYellow.bold.cyan(TRANSACTION_COMMIT));

        res.status(CREATED).end();
    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red(TRANSACTION_ROLLBACK));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
