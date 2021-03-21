const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    historyActionEnum: {updateCommentHistory},
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_UPDATE},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK}
} = require('../../constants');
const {
    commentService: {getCommentByIdService, updateCommentService},
    historyService: {addEventService},
    userService: {getUserByIdService},
} = require('../../service');
const {ErrorHandler} = require("../../error");
const winston = require('../../logger/winston');
const logger = winston(updateCommentHistory);


module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {
            id,
            commentToUpdate: {text},
            user: {userId}
        } = req;

        const userFromDB = await getUserByIdService(userId);

        const CommentFromDB = await getCommentByIdService(id);

        if (!CommentFromDB) {
            logger.error({
                message: NOT_UPDATE.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                NOT_FOUND_CODE,
                NOT_UPDATE.message,
                NOT_UPDATE.customCode));
        }

        const isUpdated = await updateCommentService(
            id,
            {text, updated_at: Date.now()},
            transaction);

        if (!isUpdated) {
            logger.error({
                message: NOT_UPDATE.message,
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            });
            return next(new ErrorHandler(
                NOT_FOUND_CODE,
                NOT_UPDATE.message,
                NOT_UPDATE.customCode));
        }

        logger.info({
            info: updateCommentHistory,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            commentId: id,
            userId,
            email: userFromDB.email,
            productId: CommentFromDB.productId
        });

        await addEventService({event: updateCommentHistory, userId}, transaction);
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
