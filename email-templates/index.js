const {
    emailActionEnum: {
        ADMIN_REGISTER, ADMIN_DELETE, ADMIN_UPDATE,
        SELLER_REGISTER, SELLER_DELETE, SELLER_UPDATE,
        USER_REGISTER, USER_DELETE, USER_UPDATE, PASSWORD_UPDATE,
        CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT
    }
} = require('../constants');

module.exports = {
    [ADMIN_REGISTER]: {
        subject: '[PIZZACHU] АДМІНЕ ВІТАЄМО ВАС!',
        templateFileName: 'createAdmin'
    },
    // [ADMIN_DELETE]: {
    //     subject: '[PIZZACHU] АДМІНЕ ВАШ АКАУНТ БУВ ВИДАЛЕНИЙ!',
    //     templateFileName: 'deleteUser'
    // },
    // [ADMIN_UPDATE]: {
    //     subject: '[PIZZACHU] АДМІНЕ ВАШ АКАУНТ ОНОВЛЕНО!',
    //     templateFileName: 'updateUser'
    // },
    [SELLER_REGISTER]: {
        subject: '[PIZZACHU] НОВИЙ ПРОДАВЕЦЬ ВІТАЄМО ВАС!',
        templateFileName: 'createSeller'
    },
    // [SELLER_DELETE]: {
    //     subject: '[PIZZACHU] АДМІНЕ ВАШ АКАУНТ БУВ ВИДАЛЕНИЙ!',
    //     templateFileName: 'deleteUser'
    // },
    // [SELLER_UPDATE]: {
    //     subject: '[PIZZACHU] АДМІНЕ ВАШ АКАУНТ ОНОВЛЕНО!',
    //     templateFileName: 'updateUser'
    // },
    [USER_REGISTER]: {
        subject: '[PIZZACHU] ВІТАЄМО!',
        templateFileName: 'createUser'
    },
    [USER_DELETE]: {
        subject: '[PIZZACHU] АКАУНТ БУВ ВИДАЛЕНИЙ!',
        templateFileName: 'deleteUser'
    },
    [USER_UPDATE]: {
        subject: '[PIZZACHU] АКАУНТ ОНОВЛЕНО!',
        templateFileName: 'updateUser'
    },
    [PASSWORD_UPDATE]: {
        subject: '[PIZZACHU] АКАУНТ ОНОВЛЕНО, ВАШ ПАРОЛЬ ЗМІНЕНО!',
        templateFileName: 'changePassword'
    },
    [CREATE_PRODUCT]: {
        subject: '[PIZZACHU] СТВОРЕНО НОВИЙ ПРОДУКТ!',
        templateFileName: 'createProduct'
    },
    [DELETE_PRODUCT]: {
        subject: '[PIZZACHU] ПРОДУКТ ВИДАЛЕНО!',
        templateFileName: 'deleteProduct'
    },
    [UPDATE_PRODUCT]: {
        subject: '[PIZZACHU] ПРОДУКТ ОНОЛЕНО!',
        templateFileName: 'updateProduct'
    }
};
