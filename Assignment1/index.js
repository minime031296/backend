// index.js
const sum = require("./sum");
const multiply = require("./multiplication");
const substraction = require("./substraction");
const division = require('./division')

let sumA = 3;
let sumB = 5;
let sumResult = sum(sumA, sumB);
console.log(sumResult);

let mulA = 4;
let mulB = 6;
let mulResult = multiply(mulA, mulB);
console.log(mulResult);

division()
substraction()


