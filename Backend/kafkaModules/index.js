const {
  Company, JobPosting, Review,
} = require('../mongodb');

module.exports = {
  addJobPosting: async (companyId, posting) => {
    const jobPosting = new JobPosting({ ...posting, company: companyId });
    const newJobPosting = await jobPosting.save();
    const company = await Company.findById(companyId);
    company.jobPostings.push(newJobPosting._id);
    return company.save();
  },
  dummyGetReviews: async () => {
    const reviews = await Review.find();
    // eslint-disable-next-line no-console
    console.log(`Received get dummy review request. First row: ${reviews[0]}`);
    return reviews;
  },
};
