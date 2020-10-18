const chalk = require('chalk');

const {transactionInstance} = require('../../dataBase').getInstance();
const {
    requestHeadersEnum: {AUTHORIZATION},
    responseStatusCodesEnum: {BAD_REQUEST, UNAUTHORIZED},
    transactionEnum: {TRANSACTION_COMMIT, TRANSACTION_ROLLBACK},
    JWT_METHOD: {ADMIN, CLIENT, SELLER}
} = require('../../constants');
const {tokenGeneratorHelper} = require('../../helpers');
const {ErrorHandler} = require('../../error');
const {
    oauthService: {deleteTokenByParamsService, createTokenPairService}
} = require('../../service');

module.exports = (jwtMethod) => async (req, res, next) => {
    const transaction = await transactionInstance();
    let keyMethod = '';
    try {
        const refresh_token = req.get(AUTHORIZATION);

        const {userId} = req.user;

        switch (jwtMethod) {
            case ADMIN:
                keyMethod = ADMIN;
                break;
            case CLIENT:
                keyMethod = CLIENT;
                break;
            case SELLER:
                keyMethod = SELLER;
                break;
            default:
                return next(new ErrorHandler(BAD_REQUEST,
                    UNAUTHORIZED.message,
                    UNAUTHORIZED.code,));
        }

        const tokens = tokenGeneratorHelper(keyMethod);

        await deleteTokenByParamsService({refresh_token}, transaction);
        await createTokenPairService({userId, ...tokens}, transaction);
        await transaction.commit();
        console.log(chalk.bgYellow.bold.cyan(TRANSACTION_COMMIT));

        res.json(tokens);
    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red(TRANSACTION_ROLLBACK));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
