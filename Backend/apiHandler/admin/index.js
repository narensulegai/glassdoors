const { Review, CompanyPhoto } = require('../../mongodb');
const { err } = require('../util');

module.exports = {
  getReviews: async (req, res) => {
    const reviews = await Review.find({
      status: req.params.status,
    })
      .populate('company', 'name')
      .populate('employee', 'email');
    res.json(reviews);
  },
  getReviewsByCompanyIdAndStatus: async (req, res) => {
    const reviews = await Review.find({
      status: req.params.status, company: req.params.id,
    })
      .populate('company', 'name')
      .populate('employee', 'email');
    res.json(reviews);
  },
  getPrivatePhotos: async (req, res) => {
    const images = await CompanyPhoto.find({
      status: req.params.status,
    })
      .populate('company', 'name')
      .populate('employee', 'email');
    res.json(images);
  },
  approveReview: async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (req.body.status === 'approved') review.status = 'approved';
    else review.status = 'rejected';
    res.json(await review.save());
  },
  approvePhoto: async (req, res) => {
    const photo = await CompanyPhoto.findById(req.params.id);
    if (req.body.status === 'approved') photo.status = 'approved';
    else photo.status = 'rejected';
    res.json(await photo.save());
  },
};
