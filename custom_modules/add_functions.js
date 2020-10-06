import connection from "../Database/connection.js";
import inquirer from "inquirer";

// const [rows] = connection.query("SELECT * FROM roles");
// console.table(rows);
// var renameMe = function () {
//   return connection.query("SELECT * FROM roles");
// }
const rolesIds = [];
const rolesTitles = [];

class AddMod {
  constructor(connection) {
    this.connection = connection;
    this.roles = connection.promise().query("SELECT id, title FROM roles");
  }

  addEmployee() {
    // console.log(this.roles);

    this.roles.then((rolesData) => {
      // console.log(rolesData[0]);
      for (var i = 0; i < rolesData[0].length; i++) {
        rolesTitles.push(rolesData[0][i].title);
      }
      // console.log(rolesTitles); OK
    });

    inquirer
      .prompt([
        {
          type: "input",
          name: "newEmployeeFirstName",
          message: "First name:",
        },
        {
          type: "input",
          name: "newEmployeeLastName",
          message: "Last name:",
        },
        {
          type: "list",
          name: "newEmployeeRole",
          message: "Choose a role:",
          choices: rolesTitles,
        },
        {
          type: "list",
          name: "newEmployeeManager",
          message: `Who is this employee's supervisor/manager?`,
          choices: ["Not applicable", "Fake Man1", "Fake Man2", "Fake Man3"],
        },
        {
          type: "confirm",
          name: "newEmpIsManager",
          message: "Is this employee a supervisor/manager of others?",
        },
      ])
      .then((response) => {
        var firstName = response.newEmployeeFirstName;
        var lastName = response.newEmployeeLastName;
        var roleChoice = response.newEmployeeRole;

        //pair the user's role selection with the appropriate ID

        // function renameMe() {
        console.log(roleChoice);
        // }

        // var role = response.newEmployeeRole;
        connection
          // .promise()
          .query(
            `INSERT INTO employees (first_name, last_name) VALUES ("${firstName}", "${lastName}")`,
            // [firstName, lastName],
            function (err, results) {
              if (err) throw err;
              console.log(results);
            }
          );
      })
      .catch((err) => {
        if (err) throw err;
      });
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
