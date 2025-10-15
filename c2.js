let verCaractere=(c1, c2)=>
{
   if (c1.length !== c2.length) {
    return -1;
}

let dif = 0;

for (let i = 0; i < c1.length; i++) {
    if (c1[i] !== c2[i]) {
        dif++;
    }
}

return dif;
}

console.log(verCaractere('Alexandra', 'Adrian'))
console.log(verCaractere('Cana', 'Masa'))