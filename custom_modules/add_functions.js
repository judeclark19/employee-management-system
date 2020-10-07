import connection from "../Database/connection.js";
import inquirer from "inquirer";
import parseMod from "./parse_functions.js";
import returnToMainMenu from "../app.js";

var firstName;
var lastName;
var roleChoice;
var roleIdx;
var managerChoice;
var managerIdx;
var isManager;

var employeeNames = [];
var employeesIds = [];

const rolesTitles = [];
const rolesIds = [];

const managersNames = [];
const managersIds = [];

const deptNames = [];
const deptIds = [];

class AddMod {
  constructor(connection) {
    this.connection = connection;
    this.employees = connection
      .promise()
      .query(
        "SELECT id, first_name, last_name FROM employees ORDER BY last_name"
      );
    this.roles = connection.promise().query("SELECT id, title FROM roles");
    this.managers = connection
      .promise()
      .query(
        "SELECT id, first_name, last_name, role_id FROM employees WHERE is_manager=1"
      );
    // this.managers = connection
    //   .promise()
    //   .query(
    //     "SELECT id, first_name, last_name, role_id FROM employees WHERE is_manager=1"
    //   );
    this.departments = connection.promise().query("SELECT * FROM departments");
  }

  async addEmployee() {
    //arrange existing roles from DB into arrays
    // parseMod.parseRoles();
    this.roles.then((rolesData) => {
      for (var i = 0; i < rolesData[0].length; i++) {
        rolesTitles.push(rolesData[0][i].title);
        rolesIds.push(rolesData[0][i].id);
      }
    });
    // this.employees.then((employeesData) => {
    //   employeesData[0].forEach((employee) => {
    //     var fullName = employee.first_name + " " + employee.last_name;
    //     employeeNames.push(fullName);
    //     employeesIds.push(employee.id);
    //   });
    // });

    //arrange existing managers from DB into arrays
    // parseMod.parseManagers();
    this.managers.then((managersData) => {
      for (var i = 0; i < managersData[0].length; i++) {
        var fullName =
          managersData[0][i].first_name + " " + managersData[0][i].last_name;
        managersNames.push(fullName);
        managersIds.push(managersData[0][i].id);
      }
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
          default: "nobody",
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
      .then(async (response) => {
        firstName = response.newEmployeeFirstName;
        lastName = response.newEmployeeLastName;
        roleChoice = response.newEmployeeRole;
        roleIdx = rolesTitles.indexOf(roleChoice);
        managerChoice = response.newEmployeeManager;
        managerIdx = managersNames.indexOf(managerChoice);
        isManager = response.newEmpIsManager;
        // addEmployee2();
        // console.log(firstName, lastName, roleChoice);
        // return;
      })
      .then(() => {
        // console.log("THIS IS WHERE rtmm WILL OCCUR");
        if (managerChoice) {
          connection
            // .promise()
            .query(
              `INSERT INTO employees (first_name, last_name, role_id, manager_id, is_manager) VALUES ("${firstName}", "${lastName}", ${rolesIds[roleIdx]}, ${managersIds[managerIdx]}, ${isManager})`,
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
                returnToMainMenu();
              }
            );
        } else {
          // return (
          connection
            // .promise()
            .query(
              `INSERT INTO employees (first_name, last_name, role_id, is_manager) VALUES ("${firstName}", "${lastName}", ${rolesIds[roleIdx]}, ${isManager})`,
              function (err, results) {
                if (err) throw err;
                console.log("Employee added:");
                console.table([
                  {
                    "First name": firstName,
                    "Last name": lastName,
                    Role: roleChoice,
                    "is Manager?": isManager,
                  },
                ]);
                returnToMainMenu();
              }
            );
          // );
        }
      });
    // .then(() => {
    //   returnToMainMenu();
    // })
    // .catch((err) => {
    //   if (err) throw err;
    // });
  }

  // async addEmployee2() {
  //   await this.addEmployee();
  //   console.log("response from addemployee2");

  // }

  addDepartment() {
    //Parse data from DB into arrays
    this.departments.then((departmentsData) => {
      for (var i = 0; i < departmentsData[0].length; i++) {
        deptNames.push(departmentsData[0][i].name);
        deptIds.push(departmentsData[0][i].id);
      }
    });

    inquirer
      .prompt([
        {
          type: "input",
          name: "newDeptName",
          message: "Enter the name of the department to add:",
        },
      ])
      .then((response) => {
        var deptName = response.newDeptName;
        connection.query(
          `INSERT INTO departments (name) VALUES ("${deptName}")`,
          function (err, results) {
            if (err) throw err;
            console.log("Department added:");
            console.table({ Name: deptName });
            returnToMainMenu();
          }
        );
        //parse response and do a connection query insert
      })
      .catch((err) => {
        if (err) throw err;
      });
  }

  addRole() {
    //parse roles
    this.roles.then((rolesData) => {
      for (var i = 0; i < rolesData[0].length; i++) {
        rolesTitles.push(rolesData[0][i].title);
        rolesIds.push(rolesData[0][i].id);
      }
    });
    //parse depts
    this.departments.then((departmentsData) => {
      for (var i = 0; i < departmentsData[0].length; i++) {
        deptNames.push(departmentsData[0][i].name);
        deptIds.push(departmentsData[0][i].id);
      }
    });

    inquirer
      .prompt([
        {
          type: "input",
          name: "newRoleTitle",
          message: "Enter new role title:",
        },
        {
          type: "number",
          name: "newRoleSalary",
          message: "Enter the salary for this role (whole number):",
        },
        {
          type: "list",
          name: "newRoleDept",
          message: "Which department does this role function under?",
          choices: deptNames,
        },
      ])
      .then((response) => {
        var newRoleTitle = response.newRoleTitle;
        var newRoleSalary = response.newRoleSalary;
        var newRoleDeptChoice = response.newRoleDept;
        var newRoleDeptIdx = deptNames.indexOf(newRoleDeptChoice);

        connection.query(
          `INSERT INTO roles (title, salary, department_id) VALUES ("${newRoleTitle}", "${newRoleSalary}", "${newRoleDeptIdx}")`,
          function (err, results) {
            if (err) throw err;
            console.log("Role added:");
            console.table([
              {
                Title: newRoleTitle,
                Salary: newRoleSalary,
                Department: newRoleDeptChoice,
              },
            ]);
          }
        );
      })
      .catch((err) => {
        if (err) throw err;
      });
  }
}

export default new AddMod(connection);
