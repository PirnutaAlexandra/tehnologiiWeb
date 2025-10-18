const sampleArray = [1, 2, 3, 4, 5];

const reduce = (array, combine, initialValue) => {
    let result = initialValue;

    for (const element of array) {
        result = combine(result, element); 
    }

    return result; 
};

console.log(reduce(sampleArray, (sum, x) => sum + x, 0));
