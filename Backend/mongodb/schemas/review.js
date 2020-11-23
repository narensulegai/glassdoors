module.exports = (mongoose) => {
  const reviewSchema = new mongoose.Schema({
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    headline: { type: String, required: true },
    description: { type: String },
    overallRating: { type: Number },
    recommendToFriend: { type: Boolean },
    ceoApproval: { type: Number },
    pros: { type: String },
    cons: { type: String },
    helpfulVotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true }],
    adminApproval: {type: Boolean, default: false}
  },
  {
    timestamps: true,
  });

  return mongoose.model('Review', reviewSchema);
};
