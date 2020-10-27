const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Company, Employee } = require('../../mongodb');

const saltRounds = 10;
const err = (msg) => ({ err: msg });
const expiresIn = 1008000;

const signPayload = (payload) => {
  const jwtSecret = process.env.JWT_SECRET;
  return jwt.sign(payload, jwtSecret, { expiresIn });
};

module.exports = {
  current: async (req, resp) => {
    if (req.session && req.session.scope) {
      let user = {};
      if (req.session.scope === 'company') {
        user = await Company.findById(req.session.user.id);
      }
      if (req.session.scope === 'employee') {
        user = await Employee.findById(req.session.user.id);
      }
      resp.json({ user, scope: req.session.scope });
    } else {
      resp.json({ user: null, scope: null });
    }
  },
  signupCompany: async (req, resp) => {
    bcrypt.hash(req.body.password, saltRounds, async (e, password) => {
      const company = new Company({ ...req.body, password });
      try {
        const user = await company.save();
        const payload = { user, scope: 'company' };
        const token = signPayload(payload);
        resp.json({ token, user });
      } catch (e) {
        if (e.code === 11000) {
          resp.status(400).json(err('Company name is already taken'));
        } else {
          throw (e);
        }
      }
    });
  },
  signupEmployee: async (req, resp) => {
    bcrypt.hash(req.body.password, saltRounds, async (e, password) => {
      const employee = new Employee({ ...req.body, password });
      try {
        const user = await employee.save();
        const payload = { user, scope: 'employee' };
        const token = signPayload(payload);
        resp.json({ token, user });
      } catch (e) {
        if (e.code === 11000) {
          resp.status(400).json(err('Email id is already taken'));
        } else {
          throw (e);
        }
      }
    });
  },
  loginCompany: async (req, res) => {
    const scope = req.params.user;
    const { name, password } = req.body;
    const user = await Company.findOne({ name });
    if (user === null) {
      res.status(401).json(err('Company doesn\'t exist'));
    } else {
      bcrypt.compare(password, user.password, (e, doseMatch) => {
        if (doseMatch) {
          delete user.password;
          const payload = { user, scope };
          const token = signPayload(payload);
          res.json({ token, user });
        } else {
          res.status(401).json(err('Company name password doesn\'t match'));
        }
      });
    }
  },
  loginEmployee: async (req, res) => {
    const scope = req.params.user;
    const { email, password } = req.body;
    const user = await Employee.findOne({ email });
    if (user === null) {
      res.status(401).json(err('Email doesn\'t exist'));
    } else {
      bcrypt.compare(password, user.password, (e, doseMatch) => {
        if (doseMatch) {
          delete user.password;
          const payload = { user, scope };
          const token = signPayload(payload);
          res.json({ token, user });
        } else {
          res.status(401).json(err('Email password doesn\'t match'));
        }
      });
    }
  },
  updateCompanyProfile: async (req, resp) => {
    const company = await Company.findById(req.session.user.id);
    Object.assign(company, req.body);
    resp.json(await company.save());
  },
};
