module.exports = async cartProducts => {

    return await cartProducts.reduce((previousValue, currentValue) => {
        return previousValue += currentValue.sum;
        
    }, 0);
};
