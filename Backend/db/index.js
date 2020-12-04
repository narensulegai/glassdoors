require('dotenv').config();

const { Sequelize } = require('sequelize');
const models = require('./models');

console.log('Connecting to MySQL using connection string', process.env.MYSQL_CONNECTION);
const db = new Sequelize(process.env.MYSQL_CONNECTION);

const dbModel = models.reduce((acc, m) => {
  acc[m.modelName] = db.define(m.modelName, m.attributes, m.options || {});
  return acc;
}, {});

(async () => {
  await db.sync();
  console.log('MySQL Connection established successfully');
  // await db.sync({ alter: true });
})();

module.exports = {
  ...dbModel,
};
