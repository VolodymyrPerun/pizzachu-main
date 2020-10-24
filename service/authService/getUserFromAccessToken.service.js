const db = require('../../dataBase').getInstance();
const {DB_TABLE_NAME: {GENDER, OAUTH_TOKEN, USER, USER_ROLE, USER_STATUS}} = require('../../constants');

module.exports = async access_token => {
    const TokenModel = await db.getModel(OAUTH_TOKEN);
    const UserModel = await db.getModel(USER);
    const GenderModel = await db.getModel(GENDER);
    const StatusModel = await db.getModel(USER_STATUS);
    const RoleModel = await db.getModel(USER_ROLE);

    return TokenModel.findOne({
        where: {
            access_token
        },
        include: [
            {
                model: RoleModel,
                attributes: ['role_id']
            },
            {
                model: UserModel,
                attributes: ['id', 'email', 'name', 'surname', 'age', 'phone', 'city', 'address', 'avatar', 'user_photo']
            },
            {
                model: GenderModel,
                attributes: ['gender_id']
            },
            {
                model: StatusModel,
                attributes: ['status_id']
            },
        ],
        attributes: [],
        raw: true
    });
};
