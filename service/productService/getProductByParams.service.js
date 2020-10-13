 const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {PRODUCT}} = require('../../constants')

module.exports = async product => {
    const UserModel = await db.getModel(PRODUCT);

    return UserModel.findOne({
        where: product,
        raw: true
    })
};
