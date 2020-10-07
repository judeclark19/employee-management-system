//THIS FILE CURRENTLY IS NOT IN USE BC I COULDN'T GET IT TO WORK

import inquirer from "inquirer";
import connection from "../Database/connection.js";
import returnToMainMenu from "../app.js";

var employeeNames = [];
var employeesIds = [];
var employeeChoiceId;

const deptNames = [];
const deptIds = [];

class DeleteMod {
  constructor(connection) {
    this.connection = connection;
    this.employees = connection
      .promise()
      .query(
        "SELECT id, first_name, last_name FROM employees ORDER BY last_name"
      );
    this.departments = connection.promise().query("SELECT * FROM departments");
  }

  deleteAnEmployee() {
    // parse employees
    this.employees.then((employeesData) => {
      employeesData[0].forEach((employee) => {
        var fullName = employee.first_name + " " + employee.last_name;
        employeeNames.push(fullName);
        employeesIds.push(employee.id);
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeChoice",
            message: "Choose an employee to delete:",
            //   choices: ["emp1", "emp2", "emp3"],
            choices: employeeNames,
          },
        ])
        .then(({ employeeChoice }) => {
          var employeeIdx = employeeNames.indexOf(employeeChoice);

          employeeChoiceId = employeesIds[employeeIdx];

          connection.query(
            `DELETE FROM employees WHERE id = ${employeeChoiceId}`,
            function (err, result) {
              if (err) {
                console.log(
                  "Cannot delete an employee who is currently a manager to others. Try reassigning managers using UPDATE actions first."
                );
              }
              console.log(`Employee deleted: ${employeeChoice}`);
              //   console.table([
              //     {
              //       "First name": firstName,
              //       "Last name": lastName,
              //       Role: roleChoice,
              //       Manager: managerChoice,
              //       "is Manager?": isManager,
              //     },
              //   ]);
              returnToMainMenu();
            }
          );
        })
        .catch((err) => {
          if (err) throw err;
        });
    });

    // return connection
    //   .promise()
    //   .query(
    //     "SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.salary, departments.name FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id ORDER BY employees.last_name"
    //   );
  }

  deleteADepartment() {
    this.departments.then((departmentsData) => {
      for (var i = 0; i < departmentsData[0].length; i++) {
        deptNames.push(departmentsData[0][i].name);
        deptIds.push(departmentsData[0][i].id);
      }
    });

    inquirer
      .prompt([
        {
          type: "list",
          name: "deptChoice",
          message: "Choose a department to delete:",
          //   choices: ["emp1", "emp2", "emp3"],
          choices: deptNames,
        },
      ])
      .then((response) => {
        //handle
      })
      .catch((err) => {
        if (err) throw err;
      });
  }

  viewAllRoles() {
    return connection
      .promise()
      .query(
        "SELECT roles.title, roles.salary, departments.name FROM roles JOIN departments ON roles.department_id = departments.id;"
      );
  }
}

export default new DeleteMod(connection);
