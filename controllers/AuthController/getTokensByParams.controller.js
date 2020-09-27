const {ErrorHandler} = require("../../error");
module.exports = async (req, res) => {

    try {
        const user = req.user
        res.json(user)

    } catch (e) {
        res.json(new ErrorHandler(e.status, e.message, e.code))
    }
}
