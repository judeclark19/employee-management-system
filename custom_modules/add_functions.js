import connection from "../Database/connection.js";

class AddMod {
  constructor(connection) {
    this.connection = connection;
  }

  addEmployee() {
    return connection.promise().query("SELECT * FROM employees");
  }

  addDepartment() {
    return connection.promise().query("SELECT * FROM departments");
  }

  addRole() {
    return connection.promise().query("SELECT * FROM roles");
  }
}

export default new AddMod(connection);
