import connection from "../Database/connection.js";
import inquirer from "inquirer";
import parseMod from "./parse_functions.js";

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
      // console.log(employeesData[0]);
      employeesData[0].forEach((employee) => {
        var fullName = employee.first_name + " " + employee.last_name;
        employeeNames.push(fullName);
        employeesIds.push(employee.id);
      });
      // console.log(employeesIds);
      //arrange role titles
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
          // var chosenEmployee = response.employeeToUpdate;
          // console.log(response);
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
        })
        .catch((err) => {
          if (err) throw err;
        });
    });
  }

  // viewAllEmployees() {
  //   // return connection.promise().query("SELECT * FROM employees");
  //   return connection
  //     .promise()
  //     .query(
  //       "SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.salary, departments.name FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id ORDER BY employees.last_name"
  //     );
  // }

  // viewAllManagers() {
  //   return connection
  //     .promise()
  //     .query(
  //       "SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.salary, departments.name FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id WHERE employees.is_manager = 1 ORDER BY employees.last_name;"
  //     );
  // }

  // viewAllDepartments() {
  //   return connection.promise().query("SELECT name FROM departments");
  // }

  // viewAllRoles() {
  //   return connection
  //     .promise()
  //     .query(
  //       "SELECT roles.title, roles.salary, departments.name FROM roles JOIN departments ON roles.department_id = departments.id;"
  //     );
  // }
}

export default new UpdateMod(connection);
