const { Employee, JobPosting, Company } = require('../../mongodb');
const { err } = require('../util');

module.exports = {
  update: async (req, resp) => {
    const employee = await Employee.findById(req.session.user._id);
    Object.assign(employee, req.body);
    const emp = await employee.save();
    resp.json(emp);
  },
  searchCompany: async (req, res) => {
    res.json(await Company
      .find()
      .sort({ createdAt: -1 }));
  },
};
