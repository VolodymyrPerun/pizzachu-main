const {OK} = require("../../constants");
module.exports = async (req, res, next) => {

    try {
        await res.json(req.user).sendStatus(OK)

    } catch (e) {
        next(e);
    }
};
