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
    const { text } = req.query;
    // TODO Use text index search
    res.json(await Company
      .find({ name: { $regex: text, $options: 'i' } }));
  },
  getCompany: async (req, res) => {
    const companyId = req.params.id;
    console.log(companyId);
    const company = await Company.findById(companyId);
    console.log(company);
    res.json(company);
  },
};
