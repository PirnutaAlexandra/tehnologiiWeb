const orderCoffee=(type) => {
    const types = {
        SPECIAL: 'SPECIAL',
        REGULAR: 'REGULAR'
    }

    if (Object.values(types).indexOf(type) === -1){
        throw new Error('coffee error')
    }
    else
        console.log(`preparing ${type} coffee`)
}

    try{
         orderCoffee('REGULAR')
         orderCoffee('SWEET_COFFEE')
    }catch(err){
        console.warn(err)
    }