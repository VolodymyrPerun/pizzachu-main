const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {GENDER, USER, USER_ROLE, USER_STATUS}} = require('../../constants');

module.exports = async userId => {
    const UserModel = await db.getModel(USER);
    const GenderModel = await db.getModel(GENDER);
    const StatusModel = await db.getModel(USER_STATUS);
    const RoleModel = await db.getModel(USER_ROLE);

    return UserModel.findOne({
        where: {
            userId
        },
        include: [
            {
                model: RoleModel,
                attributes: ['label']
            },
            {
                model: GenderModel,
                attributes: ['label']
            },
            {
                model: StatusModel,
                attributes: ['label']
            },
        ],
        raw: true
    });
};
