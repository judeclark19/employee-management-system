const viewMod = [
  {
    viewAllEmployees: function () {
      connection.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;
        console.table(results);
      });
    },

    viewAllManagers: function () {
      connection.query(
        "SELECT id, first_name, last_name, role_id FROM employees WHERE is_manager=1",
        function (err, results) {
          if (err) throw err;
          console.table(results);
        }
      );
    },

    viewAllDepartments: function () {
      connection.query("SELECT * FROM departments", function (err, results) {
        if (err) throw err;
        console.table(results);
      });
    },

    viewAllRoles: function () {
      connection.query("SELECT * FROM roles", function (err, results) {
        if (err) throw err;
        console.table(results);
      });
    },
  },
];

export { viewMod as default };
