const formatString = (text, values) => {
    let modified = text;
    for (let key in values) {
        if (modified.indexOf('{' + key + '}') !== -1) {
            modified = modified.replace('{' + key + '}', values[key]);
        }
    }

    return modified;
};

console.log(formatString("un {substantiv} este {adjectiv}", {
    substantiv: "căluț",
    adjectiv: "drăguț"
}));
