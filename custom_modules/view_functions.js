import connection from "../Database/connection.js";

class ViewMod {
  constructor(connection) {
    this.connection = connection;
  }

  viewAllEmployees() {
    // return connection.promise().query("SELECT * FROM employees");
    return connection
      .promise()
      .query(
        "SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.salary, departments.name FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id ORDER BY employees.last_name"
      );
  }

  viewAllManagers() {
    return connection
      .promise()
      .query(
        "SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.salary, departments.name FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id WHERE employees.is_manager = 1 ORDER BY employees.last_name;"
      );
  }

  viewAllDepartments() {
    return connection.promise().query("SELECT name FROM departments");
  }

  viewAllRoles() {
    return connection
      .promise()
      .query(
        "SELECT roles.title, roles.salary, departments.name FROM roles JOIN departments ON roles.department_id = departments.id;"
      );
  }
}

export default new ViewMod(connection);
