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

const analyticDashboard = {
  modelName: 'analyticDashboard',
  attributes: {
    reviewsPerDay: intType(),
    topCompanies: { ...stringType(), unique: true },
  },
};
// Example
const models = [
  // analyticDashboard,
];

module.exports = models.map((m) => merge({
  options: {
    freezeTableName: true,
  },
}, m));
