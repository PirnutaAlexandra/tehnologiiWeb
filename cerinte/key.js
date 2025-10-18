const sampleArray = [
    { name: 'Ana', age: 25 },
    { name: 'Mihai', age: 30 },
    { name: 'Bianca', age: 22 },
    { name: 'Alex', age: 27 }
]

const sortByKey = (array, key) => {
    return array.sort((a, b) => {
        if (a[key] < b[key]) return -1
        if (a[key] > b[key]) return 1
        return 0
    })
}

console.log(sortByKey(sampleArray, 'age'))
