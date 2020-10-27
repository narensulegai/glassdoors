module.exports = (mongoose) => {
  const companySchema = new mongoose.Schema({
    name: { type: String, required: true, index: { unique: true } },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    description: { type: String, required: true },
    size: { type: String, required: true },
    type: { type: String, required: true },
    revenue: { type: String, required: true },
    headquarters: { type: String, required: true },
    founded: { type: String, required: true },
    website: { type: String, required: true },
    mission: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
      },
    },
  });

  return mongoose.model('Company', companySchema);
};
