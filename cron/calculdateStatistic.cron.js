const {
    JWT_METHOD: {ADMIN, CLIENT, SELLER},
    PRODUCT_TYPE: {CHAINS, DESSERTS, DRINKS, MISO_SOUPS, PIZZA, ROLES, SALADS, SUPPLEMENTS, SUSHI}
} = require("../constants");
const {
    userService: {getUsersService},
    productService: {getAllProductsByTypeOnlyWithPageLimit}
} = require('../service');

module.exports = async () => {
    let adminsCounter = await getUsersService(ADMIN);
    let clientsCounter = await getUsersService(CLIENT);
    let sellersCounter = await getUsersService(SELLER);

    let CHAINSCounter = await getAllProductsByTypeOnlyWithPageLimit(CHAINS);
    let DESSERTSCounter = await getAllProductsByTypeOnlyWithPageLimit(DESSERTS);
    let DRINKSCounter = await getAllProductsByTypeOnlyWithPageLimit(DRINKS);
    let SUPPLEMENTSCounter = await getAllProductsByTypeOnlyWithPageLimit(SUPPLEMENTS);
    let MISO_SOUPSCounter = await getAllProductsByTypeOnlyWithPageLimit(MISO_SOUPS);
    let PIZZACounter = await getAllProductsByTypeOnlyWithPageLimit(PIZZA);
    let ROLESCounter = await getAllProductsByTypeOnlyWithPageLimit(ROLES);
    let SALADSCounter = await getAllProductsByTypeOnlyWithPageLimit(SALADS);
    let SUSHICounter = await getAllProductsByTypeOnlyWithPageLimit(SUSHI);

    console.log('_________________________________________');
    console.log(`AS OF ${new Date().toLocaleString()} NUMBER OF ALL USERS WILL BE ` + (adminsCounter.length + clientsCounter.length + sellersCounter.length) + `, INCLUDING: `
    );
    console.log(
        'ADMINS: ' + adminsCounter.length + '\n' +
        'CLIENTS: ' + clientsCounter.length + '\n' +
        'SELLERS: ' + sellersCounter.length
    );
    console.log('_________________________________________');

    console.log('_________________________________________');
    console.log(`AS OF ${new Date().toLocaleString()} NUMBER OF ALL PRODUCTS WILL BE ` +
        (
            CHAINSCounter.length +
            DESSERTSCounter.length +
            DRINKSCounter.length +
            SUPPLEMENTSCounter.length +
            MISO_SOUPSCounter.length +
            PIZZACounter.length +
            ROLESCounter.length +
            SALADSCounter.length +
            SUSHICounter.length) + `, INCLUDING: `);
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

