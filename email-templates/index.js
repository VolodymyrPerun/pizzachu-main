const {
    emailActionEnum: {
        ADMIN_REGISTER,
        SELLER_REGISTER,
        USER_REGISTER, USER_DELETE, USER_UPDATE, PASSWORD_UPDATE,
        CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT,
        CREATE_PRODUCT_TYPE, UPDATE_PRODUCT_TYPE, DELETE_PRODUCT_TYPE,
        CREATE_PRODUCT_SECTION, UPDATE_PRODUCT_SECTION, DELETE_PRODUCT_SECTION,
    }
} = require('../constants');

module.exports = {
    [ADMIN_REGISTER]: {
        subject: '[PIZZACHU] АДМІНЕ ВІТАЄМО ВАС!',
        templateFileName: 'createAdmin'
    },
    [SELLER_REGISTER]: {
        subject: '[PIZZACHU] НОВИЙ ПРОДАВЕЦЬ ВІТАЄМО ВАС!',
        templateFileName: 'createSeller'
    },
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
        subject: '[PIZZACHU] ПРОДУКТ ОНОВЛЕНО!',
        templateFileName: 'updateProduct'
    },
    [CREATE_PRODUCT_TYPE]: {
        subject: '[PIZZACHU] СТВОРЕНО НОВИЙ ТИП ПРОДУКТУ!',
        templateFileName: 'createProductType'
    },
    [UPDATE_PRODUCT_TYPE]: {
        subject: '[PIZZACHU] ОНОВЛЕНО ТИП ПРОДУКТУ!',
        templateFileName: 'updateProductType'
    },
    [DELETE_PRODUCT_TYPE]: {
        subject: '[PIZZACHU] ВИДАЛЕНО ТИП ПРОДУКТУ!',
        templateFileName: 'deleteProductType'
    },
    [CREATE_PRODUCT_SECTION]: {
        subject: '[PIZZACHU] СТВОРЕНО НОВУ СЕКЦІЮ ПРОДУКТУ!',
        templateFileName: 'createProductSection'
    },
    [UPDATE_PRODUCT_SECTION]: {
        subject: '[PIZZACHU] ОНОВЛЕНО СЕКЦІЮ ПРОДУКТУ!',
        templateFileName: 'updateProductSection'
    },
    [DELETE_PRODUCT_SECTION]: {
        subject: '[PIZZACHU] ВИДАЛЕНО СЕКЦІЮ ПРОДУКТУ!',
        templateFileName: 'deleteProductSection'
    },
};
