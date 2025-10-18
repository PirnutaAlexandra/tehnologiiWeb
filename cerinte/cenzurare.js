const checkWords = (text, dictionary) => {
    const words = text.split(' ');

    const result = words.map(word => {
        if (dictionary.indexOf(word) !== -1) {
            if (word.length > 2) {
                return word[0] + '**' + word[word.length - 1];
            }
        }

        return word;
    });

    return result.join(' ');
};


const text = "javascript este minunat";
const dictionary = ["este"];

console.log(checkWords(text, dictionary));

