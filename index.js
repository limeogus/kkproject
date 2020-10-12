const express = require('express')
const logger = require('morgan')
const app = express()

const mw =  (req, res, next) =>{
    throw Error('error!')
}

const errorMv = (err, req, res, next) =>{
    console.log(err.message)
}

app.use(logger('dev'))
app.use(mw)
app.use(errorMv)

app.listen(3000, () => console.log('running'))