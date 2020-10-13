const {
    requestHeadersEnum: {AUTHORIZATION},
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_FOUND}
} = require('../../constants');
const {tokenGeneratorHelper} = require('../../helpers');
const {ErrorHandler} = require('../../error');
const {
    oauthService: {deleteTokenByParamsService, createTokenPairService},
    userService: {getUserByIdService}
} = require('../../service');


module.exports = async (req, res, next) => {

    try {

        const access_token = req.get(AUTHORIZATION);
        const {userId} = req.user;

        const user = await getUserByIdService(userId);

        if (!user) {
            return next(new ErrorHandler(new ErrorHandler(NOT_FOUND_CODE, NOT_FOUND.message, NOT_FOUND.customCode)));
        }

        const tokens = tokenGeneratorHelper();

        await deleteTokenByParamsService({access_token});
        await createTokenPairService({...tokens, userId});

        res.json(tokens);
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.code));
    }
};
