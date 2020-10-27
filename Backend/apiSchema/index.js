const Joi = require('joi');

const validate = (body, schema) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: false, // ignore unknown props
    stripUnknown: false, // remove unknown props
  };
  return schema.validate(body, options);
};

const reqStr = (label) => Joi.string().required().label(label);
const reqNum = (label) => Joi.number().required().label(label);
const optStr = (label) => Joi.string().allow('').label(label);
const optFiles = () => Joi.array().items(Joi.string()).label('Files');

// Doc - https://joi.dev/api/?v=17.3.0
const schema = {
  signupCompany: Joi.object({
    name: reqStr('Company name'),
    email: Joi.string().email().required().label('Company email'),
    password: reqStr('Password'),
    description: reqStr('Description'),
    size: reqStr('Size'),
    type: reqStr('Type'),
    revenue: reqStr('Revenue'),
    headquarters: reqStr('Headquarters'),
    founded: reqStr('Founded'),
    website: reqStr('Website'),
    mission: reqStr('Mission'),
  }),
  signupEmployee: Joi.object({
    name: reqStr('Name'),
    email: Joi.string().email().required().label('Email'),
    password: reqStr('Password'),
    race: reqStr('Description'),
    gender: reqStr('Size'),
    disability: optStr('Type'),
    veteranStatus: optStr('Revenue'),
  }),
};

module.exports = { schema, validate };
