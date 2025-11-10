let evenCollection = document.querySelectorAll("tbody tr:nth-child(even)");
let oddCollection = document.querySelectorAll("tbody tr:nth-child(odd)");

if (oddCollection && oddCollection.length > 0) {
    for (let i = 0; i < oddCollection.length; i++) {
        let item = oddCollection[i];
        if (i === 0) item.style.backgroundColor = "blue";       
        else if (i === 1 || i === 2) item.style.backgroundColor = "violet"; 
        else if (i === oddCollection.length - 1) item.style.backgroundColor = "green";
    }
}

if (evenCollection && evenCollection.length > 0) {
    for (let item of evenCollection) {
        item.style.backgroundColor = "white";
    }
}