const Joi = require('joi');

const validate = (body, schema) => {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: false, // remove unknown props
  };
  return schema.validate(body, options);
};

const reqStr = (label) => Joi.string().required().label(label);
const reqNum = (label) => Joi.number().required().label(label);
const optNum = (label) => Joi.number().label(label);
const optStr = (label) => Joi.string().allow('').label(label);
const optFiles = () => Joi.array().items(Joi.string()).label('Files');

// Doc - https://joi.dev/api/?v=17.3.0
// TODO : complete verify schema for all create and update apis, allowUnknown should be set to false
const schema = {
  signupCompany: Joi.object({
    name: reqStr('Company name'),
    email: Joi.string().email().required().label('Company email'),
    password: Joi.string().min(3).required(),
  }),
  signupEmployee: Joi.object({
    name: reqStr('Name'),
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(3).required(),
  }),
  updateCompany: Joi.object({
    website: Joi.string().domain().label('Website'),
  }),
  addJobPosting: Joi.object({
    title: reqStr('Job title'),
  }),
  applyJob: Joi.object({
    coverLetter: reqStr('Cover letter'),
    resume: reqStr('Resume'),
  }),
  loginEmployee: Joi.object({
    email:Joi.string().email().required().label('Email'),
    password: Joi.string().required()
  }),
  loginCompany: Joi.object({
    email:Joi.string().email().required().label('Email'),
    password: Joi.string().required()
  }),
  loginAdmin: Joi.object({
    email:Joi.string().email().required(),
    password: Joi.string().required()
  }),

  update: Joi.object({
    name:Joi.string().allow('').optional(),
    race:optStr('race'),
    disability:optStr('disability'),
    veteranStatus:optStr('veteranStatus'),
    jobTitleLookingFor:optStr('jobTitleLookingFor'),
    typeOfIndustry:optStr('typeOfIndustry'),
    targetSalary:optNum('Salary'),
   

   
  }),
};

module.exports = { schema, validate };
