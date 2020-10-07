import connection from "../Database/connection.js";
import inquirer from "inquirer";
import returnToMainMenu from "../app.js";

var employeeNames = [];
var employeesIds = [];
var rolesTitles = [];
var rolesIds = [];

class UpdateMod {
  constructor(connection) {
    this.connection = connection;
    this.employees = connection
      .promise()
      .query(
        "SELECT id, first_name, last_name FROM employees ORDER BY last_name"
      );
    this.roles = connection.promise().query("SELECT id, title FROM roles");
  }

  updateEmployeeRole() {
    //parse Employee names
    this.employees.then((employeesData) => {
      employeesData[0].forEach((employee) => {
        var fullName = employee.first_name + " " + employee.last_name;
        employeeNames.push(fullName);
        employeesIds.push(employee.id);
      });
      //Parse roles
      this.roles.then((rolesData) => {
        for (var i = 0; i < rolesData[0].length; i++) {
          rolesTitles.push(rolesData[0][i].title);
          rolesIds.push(rolesData[0][i].id);
        }
      });

      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeChoice",
            message: "Choose an employee to update:",
            choices: employeeNames,
          },
          {
            type: "list",
            name: "newRole",
            message: "Choose a new role for this employee:",
            choices: rolesTitles,
          },
          {
            type: "confirm",
            name: "isManager",
            message: "Will this role include management duties?",
          },
        ])
        .then((response) => {
          var roleChoice = response.newRole;
          var roleIdx = rolesTitles.indexOf(roleChoice);
          var employeeChoice = response.employeeChoice;
          var employeeIdx = employeeNames.indexOf(employeeChoice);

          connection.query(
            `UPDATE employees SET role_id = ${rolesIds[roleIdx]}, is_manager = ${response.isManager} WHERE id=${employeesIds[employeeIdx]}`,
            (err, response) => {
              if (err) throw err;
            }
          );
          console.log("Employee updated:");
          console.table([
            {
              Name: response.employeeChoice,
              "New Role": response.newRole,
              "Is Manager?": response.isManager,
            },
          ]);
          returnToMainMenu();
        })
        .catch((err) => {
          if (err) throw err;
        });
    });
  }
}

export default new UpdateMod(connection);
