module.exports = async arr => {

    return Math.ceil(arr.reduce((previousValue, currentValue) => {
        return previousValue += currentValue.rate / arr.length;
    }, 0));

};
