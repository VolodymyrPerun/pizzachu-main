const {userService: {getUsersService}} = require('../service');

module.exports = async () => {
    // тут рахуємо шось важне )
    let newVar = await getUsersService();

    console.log(newVar.length);
};
