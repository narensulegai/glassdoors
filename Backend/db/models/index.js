const { DataTypes } = require('sequelize');
const { merge } = require('lodash');

const stringType = () => ({
  type: DataTypes.STRING,
  allowNull: true,
});

const intType = () => ({
  type: DataTypes.INTEGER,
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
