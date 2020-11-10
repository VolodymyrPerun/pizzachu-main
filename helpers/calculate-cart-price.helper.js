module.exports = async (cartProducts) => {
    return cartProducts.reduce((previousValue, currentValue) => {
        previousValue += currentValue.price * currentValue.count;

        return previousValue;
    }, 0);
};
