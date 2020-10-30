const { Company, JobPosting, JobApplication } = require('../../mongodb');
const { err } = require('../util');

module.exports = {
  update: async (req, resp) => {
    const company = await Company.findById(req.session.user._id);
    Object.assign(company, req.body);
    resp.json(await company.save());
  },
  addJobPosting: async (req, res) => {
    const companyId = req.session.user._id;
    const jobPosting = new JobPosting({ ...req.body, company: companyId });
    const newJobPosting = await jobPosting.save();
    const company = await Company.findById(companyId);
    company.jobPostings.push(newJobPosting._id);
    await company.save();
    res.json(newJobPosting);
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
      .populate('job'));
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
};
