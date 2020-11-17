const {
  Employee, JobPosting, Company, JobApplication,
  CompanySalary, Review, CompanyPhoto, InterviewExperience,
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
  searchJobPosting: async (req, res) => {
    const { text } = req.query;
    // TODO Use text index search
    res.json(await JobPosting.find({ title: { $regex: text, $options: 'i' } })
      .populate('company')
      .sort({ createdAt: -1 }));
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
    const jobPosting = await JobPosting.findById(jobId);
    const employeeId = req.session.user._id;
    const jobApplication = new JobApplication({
      ...req.body,
      job: jobId,
      employee: employeeId,
      company: jobPosting.company,
      status: 'submitted',
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
  addSalary: async (req, res) => {
    const employeeId = req.session.user._id;
    const { id: jobPostingId } = req.params;
    const { company } = await JobPosting.findById(jobPostingId);
    const companySalary = new CompanySalary({
      ...req.body,
      company,
      jobPosting: jobPostingId,
      employee: employeeId,
    });
    res.json(await companySalary.save());
  },
  getCompanyJobPosting: async (req, res) => {
    const companyId = req.params.id;
    const jobPostings = await JobPosting.find({ company: companyId });
    const companySalaries = await CompanySalary.aggregate([
      { $group: { _id: '$jobPosting', minBaseSalary: { $min: '$baseSalary' }, maxBaseSalary: { $max: '$baseSalary' } } },
    ]);

    const keyByJobPostingId = companySalaries.reduce((m, s) => {
      m[s._id] = s;
      return m;
    }, {});

    res.json(jobPostings.map((j) => {
      const { minBaseSalary, maxBaseSalary } = keyByJobPostingId[j._id]
      || { minBaseSalary: null, maxBaseSalary: null };
      return { ...j.toJSON(), minBaseSalary, maxBaseSalary };
    }));
  },
  addReview: async (req, res) => {
    const { id: companyId } = req.params;
    const employeeId = req.session.user._id;
    const review = new Review({ ...req.body, company: companyId, employee: employeeId });
    res.json(await review.save());
  },
  getReviews: async (req, res) => {
    const { id: companyId } = req.params;
    res.json(await Review.find({ company: companyId })
      .populate('employee', '-resumes')
      .sort({ createdAt: -1 }));
  },
  addCompanyPhoto: async (req, res) => {
    const { id: companyId } = req.params;
    const employeeId = req.session.user._id;
    const review = new CompanyPhoto({ ...req.body, company: companyId, employee: employeeId });
    res.json(await review.save());
  },
  getCompanyPhotos: async (req, res) => {
    const { id: companyId } = req.params;
    res.json(await CompanyPhoto.find({ company: companyId })
      .populate('employee', '-resumes')
      .sort({ createdAt: -1 }));
  },
  addInterviewExperience: async (req, res) => {
    const employeeId = req.session.user._id;
    const { id: companyId } = req.params;
    const interviewExperience = new InterviewExperience({
      ...req.body,
      company: companyId,
      employee: employeeId,
    });
    res.json(await interviewExperience.save());
  },
  getInterviewExperience: async (req, res) => {
    const { id: companyId } = req.params;
    res.json(await InterviewExperience.find({ company: companyId })
      .populate('employee', '-resumes')
      .sort({ createdAt: -1 }));
  },
};
