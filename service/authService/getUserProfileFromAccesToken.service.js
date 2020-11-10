const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {GENDER, USER, USER_ROLE, USER_STATUS}} = require('../../constants');

module.exports = async userId => {
    const GenderModel = await db.getModel(GENDER);
    const UserModel = await db.getModel(USER);
    const StatusModel = await db.getModel(USER_STATUS);
    const RoleModel = await db.getModel(USER_ROLE);

    return UserModel.findOne({
        where: userId,
        // attributes: ['userId', 'email', 'name', 'surname', 'age', 'phone', 'city', 'address', 'user_photo'],
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
            }
        ],
        raw: true
    });
};
