const {
  Employee, JobPosting, Company, JobApplication,
} = require('../../mongodb');
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
    const company = await Company.findById(companyId)
      .populate('jobPostings');
    res.json(company);
  },
  getJob: async (req, res) => {
    const jobId = req.params.id;
    const jobPosting = await JobPosting.findById(jobId)
      .populate('company');
    res.json(jobPosting);
  },
  applyJob: async (req, res) => {
    const jobId = req.params.id;
    const employeeId = req.session.user._id;
    const jobApplication = new JobApplication({
      ...req.body, job: jobId, employee: employeeId, status: 'submitted',
    });
    res.json(await jobApplication.save());
  },
  withdrawJob: async (req, res) => {
    const jobId = req.params.id;
    res.json(await JobApplication.findByIdAndDelete(jobId));
  },
  addResume: async (req, res) => {
    const fileId = req.params.id;
    const { fileName } = req.body;
    const employee = await Employee.findById(req.session.user._id);
    if (employee.resumes.length === 0) {
      employee.primaryResume = fileId;
    }
    employee.resumes.push({ fileId, fileName });
    res.json(await employee.save());
  },
  setPrimaryResume: async (req, res) => {
    const fileId = req.params.id;
    const employee = await Employee.findById(req.session.user._id);
    employee.primaryResume = fileId;
    res.json(await employee.save());
  },
  jobApplications: async (req, res) => {
    const employeeId = req.session.user._id;
    res.json(await JobApplication
      .find({ employee: employeeId })
      .populate({
        path: 'job',
        populate: {
          path: 'company',
        },
      }));
  },
};
