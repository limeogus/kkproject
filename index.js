const express = require('express')
const logger = require('morgan')
const app = express()
let users = [
    {id : 1 , name: 'Alice'},
    {id : 2 , name : 'Bek'},
    {id : 3 , name : 'Chris'}
]

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


module.exports = app