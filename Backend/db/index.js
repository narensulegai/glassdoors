const { Sequelize } = require('sequelize');
const models = require('./models');

const db = new Sequelize(process.env.MYSQL_CONNECTION);

const dbModel = models.reduce((acc, m) => {
  acc[m.modelName] = db.define(m.modelName, m.attributes, m.options || {});
  return acc;
}, {});

(async () => {
  // await db.sync({ force: true });
  // await db.sync({ alter: true });
})();

module.exports = {
  ...dbModel,
};
