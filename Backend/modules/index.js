const { Company, JobPosting, CompanySalary, Review } = require('../mongodb');
const { redisGet, redisSet } = require('../redisCli');

module.exports = {
  addJobPosting: async (companyId, posting) => {
    const jobPosting = new JobPosting({ ...posting, company: companyId });
    const newJobPosting = await jobPosting.save();
    const company = await Company.findById(companyId);
    company.jobPostings.push(newJobPosting._id);
    return company.save();
  },
  getCompanyJobPosting: async (companyId) => {
    const jobPostings = await JobPosting.find({ company: companyId });
    const companySalaries = await CompanySalary.aggregate([
      {
        $group: {
          _id: {
            jobPostings: '$jobPosting',
            yearsOfExperience: '$yearsOfExperience',
            location: '$location',
          },
          minBaseSalary: { $min: '$baseSalary' },
          maxBaseSalary: { $max: '$baseSalary' },
        },
      },
      { $sort: { '_id.yearsOfExperience': 1 } },
    ]);

    return jobPostings.map((j) => {
      const salaries = companySalaries.filter(
        (companySalary) => companySalary._id.jobPostings.toString() == j._id.toString(),
      );
      return { ...j.toJSON(), salaries };
    });
  },
  addReview: async (newReview) => {
    const review = new Review(newReview);
    await review.save();
  },
  getDummyReviews: async (companyId, limit) =>
    // With redis
    // const key = `getDummyReviews${companyId}${limit}`;
    // if (await redisGet(key) === null) {
    //   await redisSet(key, await Review.find({ company: companyId }).limit(limit));
    // }
    // return redisGet(key);
    Review.find({ company: companyId }).limit(limit),
};
