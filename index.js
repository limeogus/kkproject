const fs = require('fs')

const file = fs.readFile('text.txt', {
    encoding : 'utf8'
}, (err, data) => console.log(data)
) //테스트 파일입니다.
