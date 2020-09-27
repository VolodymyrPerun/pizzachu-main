const {checkHashPasswordHelpers} = require("../../helpers");
const {authService: {authService}} = require('../../service')


module.exports = async (req, res, next) => {
    try {
        const user = req.body;
        user.password = await checkHashPasswordHelpers(user.password);

        await authService.createTokenPairService(user);
    } catch (e) {
        next(e);
    }

    res.end();
};
