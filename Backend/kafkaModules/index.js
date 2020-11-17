const {
  Company, Employee,
} = require('../mongodb');

module.exports = {
  signupEmployee: async (emp) => {
    const employee = new Employee(emp);
    return employee.save();
  },
};
