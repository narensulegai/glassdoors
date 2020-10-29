const { Company } = require('../../mongodb');
const { err } = require('../util');

module.exports = {
  update: async (req, resp) => {
    console.log(req.session.user.id);
    const company = await Company.findById(req.session.user._id);
    Object.assign(company, req.body);
    resp.json(await company.save());
  },
};
