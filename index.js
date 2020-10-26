const express = require('express')
const logger = require('morgan')
//const bodyParser = require('body-parser')
const app = express()

let users = [
    {id : 1 , name: 'Alice'},
    {id : 2 , name : 'Bek'},
    {id : 3 , name : 'Chris'}
]

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ exteneded: true}))
app.get('/', (req,res) => res.send('Hello world!'))
app.get('/users', (req, res) => {
    
    req.query.limit = req.query.limit || 10 // 없을 경우 defalut = 10
    const limit = parseInt(req.query.limit, 10)

    //사용자 목록 조회
    if(Number.isNaN(limit)){
        res.status(400).end()
    }else{

        res.json(users.slice(0, limit))
    }

})
app.get('/users/:id', (req, res) =>{

    //id 값을 얻어낸다
    const id = parseInt(req.params.id, 10)
    const user = users.filter(user => user.id === id)[0]
    
    //console.log(id+ ' : ' +user)
    if(Number.isNaN(id)){  
        return res.status(400).end()

    }else if(!user){ // == undefined
        return res.status(404).end()
    
    }else{
        res.json(user)
    }

})

app.delete('/users/:id', (req, res)=>{
    const id = parseInt(req.params.id, 10)

    if(Number.isNaN(id)){
        return res.status(400).end()
    }
    else{
        users = users.filter(user => user.id !== id)
        return res.status(204).end()
    }

})

app.post('/users', (req,res)=>{
    //body접근을 위해 미들웨어 설치 필요 -> 강의
    //npm i body-parser --save
    //현재 > express 모듈에 req.body 참조하면 사용가능
    const name = req.body.name
    if(!name){
        return res.status(400).end()
    }

    const found = users.filter(user => user.name === name).length
    //console.log('found : ' + found)
    
    if(found){
        return res.status(409).end()
    }

    const id = Date.now() //현재시간 초
    const  user = {id, name}
    users.push(user)
    res.status(201).json(user)

})

module.exports = app