const {DB_TABLE_NAME: {USER}} = require('../../constants');

const db = require('../../dataBase').getInstance();

module.exports = async (email,password) => {
    const userModel = db.getModel(USER);
    await userModel.update({
            password: password
        },
        {
            where: {
                email: email
            }
        })
};
