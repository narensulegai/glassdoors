const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert } = require('chai');
const server = require('../nodeServer');

chai.should();
chai.use(chaiHttp);

const vars = { email: null, cookies: null };

describe('A customer', () => {
  beforeEach((done) => {
    vars.email = `${Math.random().toString(36).substring(7)}@test.com`;
    chai.request(server)
      .post('/api/signup/customer')
      .send({ name: 'test', email: vars.email, password: 'pwd' })
      .end((err, res) => {
        assert.equal(res.body.email, vars.email);
        vars.cookies = res.headers['set-cookie'].pop().split(';')[0];
        done();
      });
  });

  it('should be able to show current user when logged in using GET /api/currentUser', (done) => {
    chai.request(server)
      .get('/api/currentUser')
      .set('Cookie', vars.cookies)
      .end((err, res) => {
        assert.equal(res.body.user.email, vars.email);
        done();
      });
  });

  it('should be able to update profile using PUT /api/profile/customer', (done) => {
    chai.request(server)
      .put('/api/profile/customer')
      .send({ name: 'new name' })
      .set('Cookie', vars.cookies)
      .end((err, res) => {
        assert.equal(res.body[0], 1);
        done();
      });
  });

  it('should be able to get profile using GET /api/profile/customer', (done) => {
    chai.request(server)
      .get('/api/profile/customer')
      .set('Cookie', vars.cookies)
      .end((err, res) => {
        assert.equal(res.body.email, vars.email);
        done();
      });
  });

  it('should be able to logout using PUT /api/logout', (done) => {
    chai.request(server)
      .put('/api/logout')
      .set('Cookie', vars.cookies)
      .end((err, res) => {
        assert.equal(res.body, true);
        done();
      });
  });

  it('should be able to list all my orders using GET /api/myOrders', (done) => {
    chai.request(server)
      .get('/api/myOrders')
      .set('Cookie', vars.cookies)
      .end((err, res) => {
        assert.equal(res.body.length, 0);
        done();
      });
  });
});
