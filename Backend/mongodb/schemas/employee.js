module.exports = (mongoose) => {
  const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    race: { type: String, required: true },
    gender: { type: String, required: true },
    disability: { type: String },
    veteranStatus: { type: String },
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
