module.exports = (mongoose) => {
  const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    jobSearchStatus: {
      type: String,
      enum: ['not-looking', 'casually-looking', 'actively-looking'],
      default: 'not-looking',
    },
    jobTitleLookingFor: { type: String },
    targetSalary: { type: String },
    openToRelocation: { type: Boolean, default: false },
    typeOfIndustry: { type: String },
    race: { type: String },
    isMale: { type: Boolean, default: true },
    disability: { type: String },
    veteranStatus: { type: String },
    profilePic: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
      },
    },
  });

  return mongoose.model('Employee', companySchema);
};
