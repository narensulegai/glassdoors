require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { kafka } = require('./kafka');
const kafkaModules = require('./kafkaModules');
const handler = require('./apiHandler');
const { schema, validate } = require('./apiSchema');

let callAndWait = () => {
  console.log('Kafka client has not connected yet, message will be lost');
};

(async () => {
  if (process.env.MOCK_KAFKA !== 'true') {
    const k = await kafka();
    callAndWait = k.callAndWait;
  } else {
    callAndWait = async (fn, ...params) => kafkaModules[fn](...params);
    console.log('Connected to dev kafka');
  }
})();

const err = (msg) => ({ err: msg });
const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true,
}));

const apiVersion = '/apiV1';

[
  ['get', '/currentUser', handler.common.currentUser, null],
  ['post', '/signup/company', handler.common.signupCompany, null, schema.signupCompany],
  ['post', '/signup/employee', handler.common.signupEmployee, null, schema.signupCompany],
  ['put', '/login/company', handler.common.loginCompany, null],
  ['put', '/login/employee', handler.common.loginEmployee, null],
  ['put', '/login/admin', handler.common.loginAdmin, null],
  ['put', '/company', handler.company.update, 'company', schema.updateCompany],
  ['post', '/file', handler.common.uploadFile, 'any'],
  ['get', '/file/:id', handler.common.getFile, null],
  ['post', '/jobPosting', handler.company.addJobPosting, 'company', schema.addJobPosting],
  ['get', '/jobPosting', handler.company.getJobPosting, 'company'],
  ['put', '/employee', handler.employee.update, 'employee'],
  ['get', '/search/company', handler.employee.searchCompany, 'employee'],
  ['get', '/company/:id', handler.employee.getCompany, 'employee'],
  ['get', '/job/:id', handler.employee.getJob, 'employee'],
  ['put', '/jobApplication/:id', handler.employee.applyJob, 'employee', schema.applyJob],
  ['delete', '/jobApplication/:id', handler.employee.withdrawJob, 'employee'],
  ['post', '/resume/:id', handler.employee.addResume, 'employee'],
  ['put', '/resume/primary/:id', handler.employee.setPrimaryResume, 'employee'],
].forEach((r) => {
  app[r[0]](apiVersion + r[1], (req, resp, next) => {
    const token = req.header('authorization');
    req.session = {};
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET);
      } catch (e) {
        resp.status(401).json(err('You need to login, your session has expired'));
      }
      req.session = jwt.decode(token);
    }

    if (r[3] === 'company' || r[3] === 'employee') {
      const { scope } = req.session;
      if (scope !== r[3]) {
        resp.status(401).json(err('You are not authorized for this action.'));
      }
    }
    if (r[3] === 'any') {
      const { scope } = req.session;
      if (!scope) {
        resp.status(401).json(err('You need to login.'));
      }
    }
    if (r[4]) {
      const { error } = validate(req.body, r[4]);
      if (error) {
        const messages = error.details.map((d) => d.message);
        resp.status(400).json(err(messages[0]));
      } else {
        req.requestKafka = callAndWait;
        next();
      }
    } else {
      req.requestKafka = callAndWait;
      next();
    }
  }, async (req, res, next) => {
    try {
      await r[2](req, res, next);
    } catch (e) {
      next(e);
    }
  });
});

// Handle errors
app.use((err, req, res, next) => {
  if (err) {
    const { message } = err;
    res.status(500).json({ err: 'Something went wrong!', message });
    console.log(err);
  }
  next();
});

app.listen(parseInt(process.env.PORT));
module.exports = app; // used by mocha tests
