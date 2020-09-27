const {
    requestHeadersEnum: {AUTHORIZATION},
    responseStatusCodesEnum: {OK}
} = require('../../constants')
const {authService: {authService}} = require('../../service')


module.exports = async (req, res, next) => {
    try {
        const access_token = req.get(AUTHORIZATION)
        await authService.deleteTokenByParamsService({access_token})

        res.sendStatus(OK)
    } catch (e) {
        next(e);
    }
};
