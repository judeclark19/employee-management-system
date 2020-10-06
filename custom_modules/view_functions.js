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
        "SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.salary FROM employees INNER JOIN roles ON employees.role_id = roles.id;"
      );
  }

  viewAllManagers() {
    return connection
      .promise()
      .query(
        "SELECT id, first_name, last_name, role_id FROM employees WHERE is_manager=1"
      );
  }

  viewAllDepartments() {
    return connection.promise().query("SELECT * FROM departments");
  }

  viewAllRoles() {
    return connection.promise().query("SELECT * FROM roles");
  }
}

export default new ViewMod(connection);
//   viewAllRoles: function () {
//     connection.query("SELECT * FROM roles", function (err, results) {
//       if (err) throw err;
//       console.table(results);
//     });
//   },
// }
