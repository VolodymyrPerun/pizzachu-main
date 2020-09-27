const {
    requestHeadersEnum: {AUTHORIZATION},
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_FOUND}
} = require('../../constants')
const {tokenGeneratorHelpers} = require('../../helpers')
const {ErrorHandler} = require('../../error')
const {
    oauthService: {deleteTokenByParamsService, createTokenPairService},
    userService: {getUserByIdService}
} = require('../../service')


module.exports = async (req, res, next) => {

    try {

        const refresh_token = req.get(AUTHORIZATION)
        const userId = req.userId

        const user = await getUserByIdService(userId)

        if (!user) {
            return next(new ErrorHandler(new ErrorHandler(NOT_FOUND.message, NOT_FOUND_CODE, NOT_FOUND.customCode)))
        }

        const tokens = tokenGeneratorHelpers()

        await deleteTokenByParamsService({refresh_token})
        await createTokenPairService({...tokens, userId: user.userId})

        res.json(tokens)
    } catch (e) {
        next(e);
    }
};
