const express = require('express')
const logger = require('morgan')
const app = express()
//const bodyPaser = require('body-parser')
const user = require('./api/user/index')


//로그남기기
app.use(logger('dev'))
//req.body 사용을 위한 모듈 선언
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get('/', (req,res) => res.send('Hello world!'))
//user 관련 호출은 전부 user에서 호출
app.use('/users', user)

module.exports = app