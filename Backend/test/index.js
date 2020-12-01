const chai = require('chai');
const chaiHttp = require('chai-http');
const { assert, expect } = require('chai');
const server = require('../nodeServer');

chai.should();
chai.use(chaiHttp);

const vars = { token: null, user: null, email: null };
const agent = chai.request.agent(server);

describe('An employee', () => {
  beforeEach((done) => {
    vars.email = `${Math.random().toString(36).substring(7)}@test.com`;
    agent
      .post('/apiV1/signup/employee')
      .send({ name: 'test', email: vars.email, password: 'pwd' })
      .end((err, res) => {
        assert.equal(res.body.user.email, vars.email);
        vars.token = res.body.token;
        console.log(token)
    
        done();
      });
  });

  it('should be able to login using PUT /apiV1/login/employee', (done) => {
    chai.request(server)
      .put('/apiV1/login/employee')
      .send({ email: vars.email, password: 'pwd' })
      .end((err, res) => {
        assert.equal(res.body.user.email, vars.email);
        done();
      });
  });

  it('should show current user when logged in using GET /apiV1/currentUser', (done) => {
    agent
      .get('/apiV1/currentUser')
      .set('authorization', vars.token)
      .end((err, res) => {
        assert.equal(res.body.user.email, vars.email);
        done();
      });
  });
});
 





it('should be able to get list of comany', (done) => {
    chai.request(server)
      .get('/apiV1/search/company')
      .set('authorization', vars.token)
       .end((err, res) => {
        console.log(res)
        
         res.body.should.be.a('object');
           done();

      });
  });

  it('should be able to get review of comany', (done) => {
    chai.request(server)
      .get('/apiV1/review/5fbc8634e97b99e33f437055')
      .set('authorization', vars.token)
      .end((err, res) => {
      res.body.should.be.a('object'); 
        done();
      });
  });

  it('should be able to get  company profile', (done) => {
    chai.request(server)
      .get('/apiV1/review/company/profile/5fbc8634e97b99e33f437055')
      .set('authorization', vars.token)
      .end((err, res) => {
        
      res.body.should.be.a('object'); 
        done();
      });
  });

  it('should be able to apply for job ', (done) => {
    chai.request(server)
      .put('/apiV1/jobApplication/5fc093c19e80d1ed4e3e8e2a')
      .set('authorization', vars.token)
      .send(  {
        "employee": "5fc0941a9e80d1ed4e3e8e2c",
        "company": "5fc08ec29e80d1ed4e3e8e29",
        "status": 'submitted'})
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
  });

  it('should be able to withdraw job applcation', (done) => {
    chai.request(server)
      .delete('/apiV1/jobApplication/5fbc8634e97b99e33f437055')
      .set('authorization', vars.token)
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
  });




describe('A company', () => {
  beforeEach((done) => {
    chai.request(server)
      .put('/apiV1/login/company')
      .send({ email: 'apple@gmail.com', password: '1234' })
      .end((err, res) => {
        assert.equal(res.body.user.email, 'apple@gmail.com');
        vars.token = res.body.token;
        vars.user = res.body.user;
        done();
      });
  });

  it('should be able to add company job posting with POST /apiV1/jobPosting', (done) => {
    chai.request(server)
      .post('/apiV1/jobPosting')
      .set('authorization', vars.token)
      .send({
        title: 'Product Manager',
        industry: 'Software',
        country: 'India',
        inPerson: false,
        streetAddress: '209-12, Hi-tech city',
        city: 'Hyderabad',
        state: 'Telangana',
        zip: '500082',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        assert.equal(res.body.title, 'Product Manager');
        done();
      });
  });

  it('should be able to update company profile with PUT /apiV1/company', (done) => {
    chai.request(server)
      .put('/apiV1/company')
      .set('authorization', vars.token)
      .send({ description: 'Rated no.1 of glassdoor' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        assert.equal(res.body.email, 'apple@gmail.com');
        done();
      });
  });
});

