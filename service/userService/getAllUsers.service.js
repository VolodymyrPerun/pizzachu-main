const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {USER, USER_STATUS}} = require('../../constants')

module.exports = async status_id => {
    const UserModel = await db.getModel(USER);
    const UserStatusModel = await db.getModel(USER_STATUS);


    return UserModel.findAll({
        where: {
            status_id
        },
        attributes: ['userId', 'name', 'surname'],
        //todo dosn`t work:
        // include: [{
        //     model: UserStatusModel,
        //     attributes: ['label']
        // }],
        raw: true
    });
};
