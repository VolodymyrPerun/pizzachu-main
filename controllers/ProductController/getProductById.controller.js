const {ErrorHandler} = require("../../error");

module.exports = async (req, res, next) => {

    try {
        await res.json(req.user).end();

    } catch (e) {
        next(new ErrorHandler(e));
    }
};
