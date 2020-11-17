const {
  Company, JobPosting,
} = require('../mongodb');

module.exports = {
  addJobPosting: async (companyId, posting) => {
    const jobPosting = new JobPosting({ ...posting, company: companyId });
    const newJobPosting = await jobPosting.save();
    const company = await Company.findById(companyId);
    company.jobPostings.push(newJobPosting._id);
    return company.save();
  },
};
