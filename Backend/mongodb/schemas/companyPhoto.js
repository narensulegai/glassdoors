module.exports = (mongoose) => {
  const companyPhotoSchema = new mongoose.Schema({
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    photos: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  });

  return mongoose.model('CompanyPhoto', companyPhotoSchema);
};
