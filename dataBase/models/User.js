module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true
            },
            surname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
                required: true
            },
            gender_id: {
                type: DataTypes.STRING,
                allowNull: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.INTEGER,
                unique: true,
                allowNull: false
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            postOfficeLocation: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            user_photo: {
                type: DataTypes.STRING
            },
            create_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.fn('now')
            }
        },
        {
            tableName: 'user',
            timestamps: false
        })


    return User;
};
