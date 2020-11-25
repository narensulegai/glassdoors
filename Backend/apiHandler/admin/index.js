const { Review, CompanyPhoto } = require("../../mongodb");
const { err } = require("../util");

/* module.exports = {
  fetchUnApprovedReviews: async (req, resp) => {
    const unApprovedReviews = await Review.find({ adminApproval: false })
      .populate("employee", "email")
      .populate("company", "name");
    return resp.json(unApprovedReviews);
  },

  approveAReview: async (req, resp) => {
    const reviewId = req.body.reviewId;
    resp.json(await Review.update({ _id: reviewId }, { adminApproval: true }));
  },
  fetchUnApprovedCompanyPhotos: async (req, resp) => {
    const unApprovedPhotos = await CompanyPhoto.find({ adminApproval: false })
      .populate("employee", "email")
      .populate("company", "name");
    return resp.json(unApprovedPhotos);
  },

  approveAnImage: async (req, resp) => {
    const companyPhotosId = req.body.companyPhotosId;
    resp.json(await CompanyPhoto.update({ _id: companyPhotosId }, { adminApproval: true }));
 const { Review, CompanyPhoto } = require('../../mongodb');
const { err } = require('../util');
 */

module.exports = {
  getPrivateReviews: async (req, res) => {
    const reviews = await Review.find(
      {
        status: 'private',
      },
    );
    res.json(reviews);
  },
  getPrivatePhotos: async (req, res) => {
    const images = await CompanyPhoto.find(
      {
        status: 'private',
      },
    );
    res.json(images);
  },
  approveReview: async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (req.body.status === 'approved') review.status = 'approved';
    else req.body.status = 'rejected';
    res.json(await review.save());
  },
  approvePhoto: async (req, res) => {
    const photo = await CompanyPhoto.findById(req.params.id);
    if (req.body.status === 'approved') photo.status = 'approved';
    else photo.status = 'rejected';
    res.json(await photo.save());
  },
};
