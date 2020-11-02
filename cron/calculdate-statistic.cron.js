const {
    JWT_METHOD: {ADMIN, CLIENT, SELLER},
    PRODUCT_TYPE: {CHAINS, DESSERTS, DRINKS, MISO_SOUPS, PIZZA, ROLES, SALADS, SUPPLEMENTS, SUSHI}
} = require("../constants");
const {
    userService: {getUsersService},
    productService: {getAllProductsService, getAllProductsByTypeService}
} = require('../service');

module.exports = async () => {
    // тут рахуємо шось важливе
    let adminsCounter = await getUsersService(ADMIN);
    let clientsCounter = await getUsersService(CLIENT);
    let sellersCounter = await getUsersService(SELLER);

    let AllProductsCounter = await getAllProductsService();
    let CHAINSCounter = await getAllProductsByTypeService(CHAINS);
    let DESSERTSCounter = await getAllProductsByTypeService(DESSERTS);
    let DRINKSCounter = await getAllProductsByTypeService(DRINKS);
    let SUPPLEMENTSCounter = await getAllProductsByTypeService(SUPPLEMENTS);
    let MISO_SOUPSCounter = await getAllProductsByTypeService(MISO_SOUPS);
    let PIZZACounter = await getAllProductsByTypeService(PIZZA);
    let ROLESCounter = await getAllProductsByTypeService(ROLES);
    let SALADSCounter = await getAllProductsByTypeService(SALADS);
    let SUSHICounter = await getAllProductsByTypeService(SUSHI);

    console.log('_________________________________________');
    console.log(`AS OF ${new Date().toLocaleString()} NUMBER OF ALL ACTIVE USERS WILL BE ` + (adminsCounter.length + clientsCounter.length + sellersCounter.length) + `, INCLUDING: `
    );
    console.log(
        'ADMINS: ' + adminsCounter.length + '\n' +
        'CLIENTS: ' + clientsCounter.length + '\n' +
        'SELLERS: ' + sellersCounter.length
    );
    console.log('_________________________________________');

    console.log('_________________________________________');
    console.log(`AS OF ${new Date().toLocaleString()} NUMBER OF ALL PRODUCTS WILL BE ` +
        AllProductsCounter.length + `, INCLUDING: `);
    console.log(
        'CHAINS: ' + CHAINSCounter.length + '\n' +
        'DESSERTS: ' + DESSERTSCounter.length + '\n' +
        'DRINKS: ' + DRINKSCounter.length + '\n' +
        'SUPPLEMENTS: ' + SUPPLEMENTSCounter.length + '\n' +
        'MISO_SOUPS: ' + MISO_SOUPSCounter.length + '\n' +
        'PIZZA: ' + PIZZACounter.length + '\n' +
        'ROLES: ' + ROLESCounter.length + '\n' +
        'SALADS: ' + SALADSCounter.length + '\n' +
        'SUSHI: ' + SUSHICounter.length
    );
    console.log('_________________________________________');
};

