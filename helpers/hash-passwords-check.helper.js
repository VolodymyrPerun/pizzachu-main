const bcrypt = require('bcrypt');

const {CustomErrorData: {BAD_REQUEST_USER_NOT_PRESENT}, ErrorHandler} = require("../error");

module.exports = async (hashedPassword, password) => {

    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordCorrect) {
        throw new ErrorHandler(BAD_REQUEST_USER_NOT_PRESENT,
            BAD_REQUEST_USER_NOT_PRESENT.message,
            BAD_REQUEST_USER_NOT_PRESENT.customCode);
    }
};
