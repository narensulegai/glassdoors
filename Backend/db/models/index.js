const { DataTypes } = require('sequelize');
const { merge } = require('lodash');
const moment = require('moment');

const stringType = () => ({
  type: DataTypes.STRING,
  allowNull: true,
});


const reviewsPerDay = {
  modelName: 'CompanyReviews',
  attributes: {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    employeeId: { ...stringType() },
    reviewId: { ...stringType() },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: moment().format('MM/DD/YYYY')  
    }
  },
};

const viewsPerDay = {
  modelName: 'CompanyViews',
  attributes: {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    employeeId: { ...stringType() },
    companyId: { ...stringType() },
    companyName: { ...stringType() },

  },
};

const models = [
  reviewsPerDay,
  viewsPerDay,
];

module.exports = models.map((m) => merge({
  options: {
    freezeTableName: true,
  },
}, m));
