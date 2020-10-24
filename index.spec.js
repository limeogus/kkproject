const assert = require('assert')
const should = require('should')
const request = require('supertest')
const app = require('./index')

describe('GET /users', () => {
    //done 함수 : mocha에서 지원
    //중요한 포인트 마다 테스트 코드를 만드는 것이 중요한 것
    describe('성공', ()=>{
        it('배열을 반환한다.', (done)=>{
                request(app)
                .get('/users')
                .end((err, res) =>{
                    //console.log(res.body)
                    //1.should를 이용한 배열 확인
                    res.body.should.be.instanceof(Array)
                    
                    //2.should를 이용한 배열 확인
                    res.body.forEach(user => {
                        user.should.have.property('name')
                    })

                    done() //test 종료
                })
            })
            
            it('최대 limit 갯수만큼 응답한다', (done) =>{
                request(app)
                .get('/users?limit=2')
                .end((err, res) =>{
                    res.body.should.have.lengthOf(2)
                    done()
                })
            })

        })

        describe('실패', ()=>{
            it('limit이 정수가 아니면 400을 응답한다.', done =>{
                request(app)
                .get('/users?limit=one')
                .expect(400)
                .end(done)
            })
        })
    })

describe('GET /users/:id', ()=>{

    describe('성공',() =>{
        it('유저 객체를 반환한다', done =>{
            request(app)
            .get('/users/1')
            .end((err, res) => {
                res.body.should.have.property('id', 1)
                done() //mocha 테스트완료 알림
            })
        })    
    })

    describe('실패', () =>{
        it('id가 숫자가 아닐경우 400 응답', (done) =>{
            request(app)
            .get('/users/one')
            .expect(400)
            .end(done)
        })

        it('찾을 수 없는 id일 경우 404 응답', (done)=>{
            request(app)
                .get('/users/9')
                .expect(404)
                .end(done)
        })
    })
})