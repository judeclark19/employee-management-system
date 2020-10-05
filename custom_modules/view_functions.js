// const viewFunctionsMod = {};

export function viewAllEmployees() {
  connection.query("SELECT * FROM employees", function (err, results) {
    if (err) throw err;
    //success ACTION
    console.table(results);
  });
}

export function viewAllManagers() {
  connection.query(
    "SELECT id, first_name, last_name, role_id FROM employees WHERE is_manager=1",
    function (err, results) {
      if (err) throw err;
      console.table(results);
    }
  );
}

export function viewAllDepartments() {
  connection.query("SELECT * FROM departments", function (err, results) {
    if (err) throw err;
    //success ACTION
    console.table(results);
  });
}

export function viewAllRoles() {
  connection.query("SELECT * FROM roles", function (err, results) {
    if (err) throw err;
    //success ACTION
    console.table(results);
  });
}
