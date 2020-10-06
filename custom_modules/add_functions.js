import connection from "../Database/connection.js";
import inquirer from "inquirer";
// import viewMod from "./custom_modules/view_functions.js";

// const [rows] = connection.query("SELECT * FROM roles");
// console.table(rows);
// var renameMe = function () {
//   return connection.query("SELECT * FROM roles");
// }
const rolesTitles = [];
const rolesIds = [];

const managersNames = [];
const managersIds = [];

class AddMod {
  constructor(connection) {
    this.connection = connection;
    this.roles = connection.promise().query("SELECT id, title FROM roles");
    this.managers = connection
      .promise()
      .query(
        "SELECT id, first_name, last_name, role_id FROM employees WHERE is_manager=1"
      );
  }

  addEmployee() {
    // console.log(this.roles);

    this.roles.then((rolesData) => {
      // console.log(rolesData[0]);
      for (var i = 0; i < rolesData[0].length; i++) {
        rolesTitles.push(rolesData[0][i].title);
        rolesIds.push(rolesData[0][i].id);
      }
      // console.log(rolesTitles); OK
    });

    this.managers.then((managersData) => {
      // console.log(managersData[0]);

      for (var i = 0; i < managersData[0].length; i++) {
        var fullName =
          managersData[0][i].first_name + " " + managersData[0][i].last_name;
        managersNames.push(fullName);
        managersIds.push(managersData[0][i].id);
      }
      // console.log(managersIds);
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
          type: "confirm",
          name: "hasManager",
          message: `Does this employee have a manager?`,
        },
        {
          type: "list",
          name: "newEmployeeManager",
          message: `Who is this employee's supervisor/manager?`,
          choices: managersNames,
          when: function (response) {
            return response.hasManager;
          },
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
        var roleIdx = rolesTitles.indexOf(roleChoice);
        var managerChoice = response.newEmployeeManager;
        var managerIdx = managersNames.indexOf(managerChoice);
        // var chosenManager = response.newEmployeeManager;
        var isManager = response.newEmpIsManager;
        //pair the user's role selection with the appropriate ID

        // function renameMe() {
        // console.log(rolesIds[roleIdx]);
        // }

        // var role = response.newEmployeeRole;
        connection
          // .promise()
          .query(
            `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${rolesIds[roleIdx]}, ${managersIds[managerIdx]})`,
            function (err, results) {
              if (err) throw err;
              console.log("Employee added:");
              console.table([
                {
                  "First name": firstName,
                  "Last name": lastName,
                  Role: roleChoice,
                  Manager: managerChoice,
                  "is Manager?": isManager,
                },
              ]);
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
