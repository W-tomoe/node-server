const {add, mul} = require('./a.js')
const sum = add(10, 20)
const result = mul(100,200)

const _ = require('lodash')

const arr = _.concat([1,2], [3])

console.log(sum, result, arr)