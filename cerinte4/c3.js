
function expGen(base) {
  const cache = [1, base];

  const pow = (exp) => {
    if (exp < cache.length) {
      console.log('found ' + exp);
      return cache[exp];
    } else {
      console.log('calculated ' + exp);
      cache[exp] = base * pow(exp - 1); 
      return cache[exp];
    }
  };

  return pow;
}

const p2 = expGen(2); 

console.log(p2(3)); 
console.log(p2(3)); 
console.log(p2(5)); 
