const { Review, CompanyPhoto } = require("../../mongodb");
const { err } = require("../util");

module.exports = {
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
  },
};
