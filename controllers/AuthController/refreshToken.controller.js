const {
    requestHeadersEnum: {AUTHORIZATION},
    responseStatusCodesEnum: {NOT_FOUND: NOT_FOUND_CODE},
    responseCustomErrorEnum: {NOT_FOUND}
} = require('../../constants')
const {tokenGeneratorHelpers} = require('../../helpers')
const {ErrorHandler} = require('../../error')
const {authService: {authService}, userService: {userService}} = require('../../service')


module.exports = async (req, res, next) => {

    try {

        const refresh_token = req.get(AUTHORIZATION)
        const userId = req.userId

        const user = await userService.getUserByIdService(userId)

        if (!user) {
            return next(new ErrorHandler(new ErrorHandler(NOT_FOUND.message, NOT_FOUND_CODE, NOT_FOUND.customCode)))
        }

        const tokens = tokenGeneratorHelpers()

        await authService.deleteTokenByParamsService({refresh_token})
        await authService.createTokenPairService({...tokens, userId: user.userId})

        res.json(tokens)
    } catch (e) {
        next(e);
    }
};
