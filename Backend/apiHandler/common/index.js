const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Company, Employee } = require('../../mongodb');
const { err } = require('../util');

const saltRounds = 10;
const expiresIn = 1008000;

const signPayload = (payload) => {
  const jwtSecret = process.env.JWT_SECRET;
  return jwt.sign(payload, jwtSecret, { expiresIn });
};

module.exports = {
  currentUser: async (req, resp) => {
    if (req.session && req.session.scope) {
      let user = {};
      if (req.session.scope === 'company') {
        user = await Company.findById(req.session.user._id);
      }
      if (req.session.scope === 'employee') {
        user = await Employee.findById(req.session.user._id);
      }
      resp.json({ user, scope: req.session.scope });
    } else {
      resp.json({ user: null, scope: null });
    }
  },
  uploadFile: async (req, res) => {
    const upload = multer({ dest: 'uploads/' }).array('files', 5);
    upload(req, res, (e) => {
      if (e) {
        res.status(400).json(err('Error while uploading file'));
      } else {
        res.json({ files: req.files.map((f) => f.filename) });
      }
    });
  },
  getFile: async (req, res) => {
    const fileId = req.params.id;
    // TODO: file path injection
    res.sendFile(path.join(__dirname, '../../uploads', fileId));
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
          resp.status(400).json(err('Company name and/or email is already taken'));
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
    const { email, password } = req.body;
    const user = await Company.findOne({ email });
    if (user === null) {
      res.status(401).json(err('Email id doesn\'t exist'));
    } else {
      bcrypt.compare(password, user.password, (e, doseMatch) => {
        if (doseMatch) {
          const payload = { user, scope: 'company' };
          const token = signPayload(payload);
          res.json({ token, user });
        } else {
          res.status(401).json(err('Company name password doesn\'t match'));
        }
      });
    }
  },
  loginEmployee: async (req, res) => {
    const { email, password } = req.body;
    const user = await Employee.findOne({ email });
    if (user === null) {
      res.status(401).json(err('Email doesn\'t exist'));
    } else {
      bcrypt.compare(password, user.password, (e, doseMatch) => {
        if (doseMatch) {
          const payload = { user, scope: 'employee' };
          const token = signPayload(payload);
          res.json({ token, user });
        } else {
          res.status(401).json(err('Email password doesn\'t match'));
        }
      });
    }
  },
  loginAdmin: async (req, res) => {
    const adminEmail = 'admin@glassdoor.com';
    const pwdHash = '$2b$10$XBjuYFTtexW8YsvdkKuOpeuXoJ8nxUXQuaUkPwYfQrzOdTmDi1jH2'; // pwd
    const { email, password } = req.body;
    if (email !== adminEmail) {
      res.status(401).json(err(`Email doesn't exist, try ${adminEmail}`));
    } else {
      bcrypt.compare(password, pwdHash, (e, doseMatch) => {
        if (doseMatch) {
          const user = { email: adminEmail, name: 'Admin' };
          const payload = { user, scope: 'admin' };
          const token = signPayload(payload);
          res.json({ token, user });
        } else {
          res.status(401).json(err('Email password doesn\'t match, try pwd'));
        }
      });
    }
  },
};
