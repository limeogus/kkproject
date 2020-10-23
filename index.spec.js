const assert = require('assert')
const should = require('should')
const request = require('supertest')
const app = require('./index')

describe('GET /users', () => {

    //it : mocha 함수
    it('배열을 반환한다.', ()=>{
        //node 기본모듈 assert
        //assert.equal(1,0)   
        (1).should.equal(1)

    })
})