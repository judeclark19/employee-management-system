import connection from "../Database/connection.js";

class ViewMod {
  constructor(connection) {
    this.connection = connection;
  }

  viewAllEmployees() {
    return connection.promise().query("SELECT * FROM employees");
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
