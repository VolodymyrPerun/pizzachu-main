const {ErrorHandler} = require("../../error");
const {
    requestHeadersEnum: {AUTHORIZATION},
    responseStatusCodesEnum: {OK}
} = require('../../constants')
const {oauthService: {deleteTokenByParamsService}} = require('../../service')


module.exports = async (req, res, next) => {
    try {
        const access_token = req.get(AUTHORIZATION)
        await deleteTokenByParamsService({access_token})

        res.sendStatus(OK)
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.code));
    }
};
