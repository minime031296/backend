const process = require('process')
const crypto = require('crypto')
const {log} = require('console')


const args = process.argv.splice(2)
const operation = args[0]
const num1 = Number(args[1])
const num2 = Number(args[2])

/*calculation for calculator*/

function calculation() {
    switch(operation) {
        case "add":
            return num1 + num2
        case "sub":
            return num1 - num2
        case "mult":
            return num1 * num2
        case "division":
            return num1/num2
        case "sin":
            return Math.sin(num1)
        case "cos":
            return Math.cos(num1)
        case "tan":
            return Math.tan(num1)
        case "random":
            if (isNaN(num1)) {
                console.log('Provide length for random number generation.');
            } else {
                return crypto.randomBytes(Math.floor(num1)).toString('binary');
            }
        default:
            return `Invalid Operation`
    }

}

const result = calculation();
log(result);

