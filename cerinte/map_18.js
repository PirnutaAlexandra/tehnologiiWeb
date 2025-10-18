const birthYears = [2005, 1998, 2010, 1985, 2007, 1999, 1970];

const ages = birthYears.map(year => 2025 - year);

const major = ages.filter(age => age >= 18);

console.log("Ages: ", ages);
console.log("Major :", major);
