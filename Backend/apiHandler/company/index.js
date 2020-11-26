const { Company, JobPosting, JobApplication, Employee } = require('../../mongodb');
const { err } = require('../util');

module.exports = {
  update: async (req, resp) => {
    const company = await Company.findById(req.session.user._id);
    Object.assign(company, req.body);
    resp.json(await company.save());
  },
  addJobPosting: async (req, res) => {
    const companyId = req.session.user._id;
    res.json(req.requestKafka('addJobPosting', companyId, req.body));
    // Dont wait for Kafka
    // res.json({ ...req.body, company: companyId });
  },
  getJobPosting: async (req, res) => {
    const companyId = req.session.user._id;
    res.json(await JobPosting
      .find({ company: companyId })
      .sort({ createdAt: -1 }));
  },
  jobApplications: async (req, res) => {
    const companyId = req.session.user._id;
    res.json(await JobApplication.find({ company: companyId })
      .populate('job')
      .populate('employee'));
  },
  getEmployee: async (req, res) => {
    const { id: employeeId } = req.params;
    res.json(await Employee.findById(employeeId));
  },
  setJobApplicationStatus: async (req, res) => {
    const companyId = req.session.user._id;
    const jobApplicationId = req.params.id;
    const jobApp = await JobApplication.findById(jobApplicationId);
    const { status } = req.body;
    jobApp.status = status;
    if (jobApp.company.toString() !== companyId) {
      res.status(400).json(err('Job application not found'));
    } else {
      res.json(await jobApp.save());
    }
  },
  getCompanyReport: async (req, res) => {
    const companyId = req.session.user._id;
    const d = new Date();
    d.setFullYear(d.getFullYear() - 1);
    // Job posting in the last year
    const jobPosting = await JobPosting.find({ company: companyId, createdAt: { $gt: d } });
    const jobIds = jobPosting.map((j) => j._id);
    res.json(await JobApplication.find({ job: jobIds })
      .populate('employee')
      .populate('job'));
  },
};
