const {ErrorHandler} = require("../../error");
const {oauthService: {deleteTokenByParamsService}} = require('../../service')

module.exports = async (req, res, next) => {
    try {
        const {userId} = req.params

        const isDeleted = await deleteTokenByParamsService({userId})

        isDeleted ? res.sendStatus(204) : res.json({deleted: false})
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.code))
    }
}
