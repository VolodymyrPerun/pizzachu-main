const {ErrorHandler} = require("../../error");
const {checkHashPasswordHelpers} = require("../../helpers");
const {oauthService:{createTokenPairService}} = require('../../service')


module.exports = async (req, res, next) => {
    try {
        const user = req.body;
        user.password = await checkHashPasswordHelpers(user.password);

        await createTokenPairService(user);
    } catch (e) {
        next(new ErrorHandler(e.status, e.message, e.code));
    }

    res.end();
};
