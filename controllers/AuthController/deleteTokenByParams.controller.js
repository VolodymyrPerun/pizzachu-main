const {authService: {authService}} = require('../../service')

module.exports = async (req, res, next) => {
    try {
        const {userId} = req.params

        const isDeleted = await authService.deleteTokenByParamsService({userId})

        isDeleted ? res.sendStatus(204) : res.json({deleted: false})
    } catch (e) {
        next(e)
    }
}
