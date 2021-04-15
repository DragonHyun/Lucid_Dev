const should = require('should');
const request = require('supertest');
const app = require('../app');

describe('GET /user/:id', () => {
    it('should return array', (done) => {
        request(app)
            .get('/user/1')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                res.body.result.should.be.an.instanceof(Object);
                res.body.result.should.have.properties('id', 'name', 'age', 'married', 'comment');
                res.body.result.id.should.be.a.Number();
                res.body.result.name.should.be.a.String();
                res.body.result.age.should.be.a.Number();

                done();
            });
    });
});