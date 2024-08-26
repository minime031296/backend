const division = (a,b) => {
    if(b == 0) {
        console.log('division is not possible')
    }
    else{
        return a/b
    }
}

console.log(division(2, 3))

module.export = division