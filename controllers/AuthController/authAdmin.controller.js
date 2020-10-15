const Joi = require('joi');
const chalk = require('chalk')

const {transactionInstance} = require('../../dataBase').getInstance();

const {
    CustomErrorData: {BAD_REQUEST_ADMIN_NOT_PRESENT, FORBIDDEN_USER_IS_BLOCKED}
} = require("../../error");
const {USER_ROLE: {ADMIN}, USER_STATUS: {BLOCKED}, JWT_METHOD} = require("../../constants");
const {authValidator: {authValidationSchema}} = require("../../validators");
const {
    responseStatusCodesEnum: {BAD_REQUEST, FORBIDDEN},
    responseCustomErrorEnum: {NOT_VALID}
} = require('../../constants');
const {tokenGeneratorHelper, HashPasswordCheckHelper} = require('../../helpers');
const {ErrorHandler} = require('../../error');
const {
    oauthService: {createTokenPairService},
    userService: {getUserByParamsService}
} = require('../../service');


module.exports = async (req, res, next) => {
    const transaction = await transactionInstance();
    try {
        const {email, password} = req.body;

        //todo create compare password service, forgot pass and change pass controller, try to login user,
        //todo after that create admin controller and auth admin

        const admin = await getUserByParamsService({email, role_id: ADMIN}, transaction);


        if (!admin) {
            return next(new ErrorHandler(BAD_REQUEST,
                BAD_REQUEST_ADMIN_NOT_PRESENT.message,
                BAD_REQUEST_ADMIN_NOT_PRESENT.code));
        }

        if (admin.status_id === BLOCKED) {
            return next(new ErrorHandler(FORBIDDEN,
                FORBIDDEN_USER_IS_BLOCKED.message,
                FORBIDDEN_USER_IS_BLOCKED.code));
        }

        const {error} = Joi.validate({email, password}, authValidationSchema);//todo authValidateSchema

        if (error) return next(new ErrorHandler(BAD_REQUEST, error.details[0].message, NOT_VALID.customCode));

        await HashPasswordCheckHelper(admin.password, password);

        const tokens = tokenGeneratorHelper(JWT_METHOD.ADMIN);

        await createTokenPairService({userId: admin.userId, ...tokens}, transaction);

        await transaction.commit();
        console.log(chalk.bgRedBright.bold.greenBright('TRANSACTION COMMIT'))

        res.json(tokens).end();
    } catch (e) {
        console.log(chalk.bgGreen.bold.red(e.status, e.message, e.customCode));
        console.log(chalk.red('TRANSACTION ROLLBACK'));
        await transaction.rollback();
        next(new ErrorHandler(e.status, e.message, e.customCode));
    }
};
