import connection from "../Database/connection.js";
import inquirer from "inquirer";

const rolesTitles = [];
const rolesIds = [];

const managersNames = [];
const managersIds = [];

const deptNames = [];
const deptIds = [];

class AddMod {
  constructor(connection) {
    this.connection = connection;
    this.roles = connection.promise().query("SELECT id, title FROM roles");
    this.managers = connection
      .promise()
      .query(
        "SELECT id, first_name, last_name, role_id FROM employees WHERE is_manager=1"
      );
    this.departments = connection.promise().query("SELECT * FROM departments");
  }

  addEmployee() {
    //arrange existing roles from DB into arrays
    this.roles.then((rolesData) => {
      for (var i = 0; i < rolesData[0].length; i++) {
        rolesTitles.push(rolesData[0][i].title);
        rolesIds.push(rolesData[0][i].id);
      }
    });

    //arrange existing managers from DB into arrays
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
        var isManager = response.newEmpIsManager;

        connection.query(
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
          }
        );
      })
      .catch((err) => {
        if (err) throw err;
      });
  }

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
          }
        );
        //parse response and do a connection query insert
      })
      .catch((err) => {
        if (err) throw err;
      });
  }

  addRole() {
    return connection.promise().query("SELECT * FROM roles");
  }
}

export default new AddMod(connection);
