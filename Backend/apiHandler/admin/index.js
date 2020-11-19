const { Review, CompanyPhoto } = require('../../mongodb');
const { err } = require('../util');

module.exports = {
  getPrivateReviews: async (req, res) => {
    const companyId = req.body.companyId;
    const reviews = await Review.find(
      {
        company: companyId,
        status: 'private',
      },
    );
    res.json(reviews);
  },
  getPrivatePhotos: async (req, res) => {
    const companyId = req.body.companyId;
    const images = await CompanyPhoto.find(
      {
        company: companyId,
        photos: { $elemMatch: { status: 'private' } },
      },
    );
    res.json(images);
  },
  approveReview: async (req, res) => {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId);
    if (req.body.status === 'approved') review.status = 'approved';
    else review.status = 'rejected';
    res.json(await review.save());
  },
  approveImage: async (req, res) => {
    // const photoId = req.params.id;
    // const photo = await CompanyPhoto.findById(photoId);
  },
  getJobAnalytics: async (req, res) => {
  },

}