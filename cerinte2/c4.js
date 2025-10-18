function intercalate(s1,s2)
{
    if(s1.length !== s2.length)
        return -1;
    let out=[];
    let i=0;
    while(i<s1.length)
    {
       out.push(s1[i]);
       out.push(s2[i]);
       i++
    }

    return out;
}

let x = ["a", "c", "f"];
let y = ["b", "d", "g"];
console.log(intercalate(x, y).join(" , "));