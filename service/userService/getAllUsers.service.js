const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {USER, USER_STATUS, USER_ROLE, GENDER}} = require('../../constants')

module.exports = async (status_id, transaction) => {
    const UserModel = await db.getModel(USER);
    const UserGenderModel = await db.getModel(GENDER);
    const UserStatusModel = await db.getModel(USER_STATUS);
    const UserRoleModel = await db.getModel(USER_ROLE);


    return UserModel.findAll({
        where: {
            status_id
        },
        attributes: ['userId', 'name', 'surname'],
        include: [
            {
                model: UserGenderModel,
                attributes: ['label']
            }, {
                model: UserStatusModel,
                attributes: ['label']
            }, {
                model: UserRoleModel,
                attributes: ['label']
            }
        ],
        raw: true,
        transaction
    });
};
