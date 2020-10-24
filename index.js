const express = require('express')
const logger = require('morgan')
const app = express()
const users = [
    {id : 1 , name: 'Alice'},
    {id : 2 , name : 'Bek'},
    {id : 3 , name : 'Chris'}
]

app.get('/', (req,res) => res.send('Hello world!'))
app.get('/users', (req, res) => {
    
    req.query.limit = req.query.limit || 10 // 없을 경우 defalut = 10
    const limit = parseInt(req.query.limit, 10)
    
    // todo
    //if(limit =="NaN"){ 
    if(Number.isNaN(limit)){
        res.status(400).end()

    }else{

        res.json(users.slice(0, limit))
    }
    //console.log(limit)

})

app.listen(3000, () => console.log('running'))


module.exports = app