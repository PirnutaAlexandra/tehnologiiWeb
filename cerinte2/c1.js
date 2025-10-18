let concatStrings = (array) => {
    let result = "";
    for (let i = 0; i < array.length; i++) {
        result += array[i];
    }
    return result;
};

console.log(concatStrings(["Sunt", "din", "grupa", "1087"]));
