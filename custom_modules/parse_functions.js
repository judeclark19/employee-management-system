import connection from "../Database/connection.js";
import inquirer from "inquirer";

var employeeNames = [];
var employeesIds = [];

const rolesTitles = [];
const rolesIds = [];

const managersNames = [];
const managersIds = [];

const deptNames = [];
const deptIds = [];

class ParseMod {
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
    this.departments = connection.promise().query("SELECT * FROM departments");
  }

  parseEmployees() {
    this.employees.then((employeesData) => {
      employeesData[0].forEach((employee) => {
        var fullName = employee.first_name + " " + employee.last_name;
        employeeNames.push(fullName);
        employeesIds.push(employee.id);
      });
    });
  }

  parseManagers() {
    this.managers.then((managersData) => {
      for (var i = 0; i < managersData[0].length; i++) {
        var fullName =
          managersData[0][i].first_name + " " + managersData[0][i].last_name;
        managersNames.push(fullName);
        managersIds.push(managersData[0][i].id);
      }
    });
  }

  parseRoles() {
    this.roles.then((rolesData) => {
      for (var i = 0; i < rolesData[0].length; i++) {
        rolesTitles.push(rolesData[0][i].title);
        rolesIds.push(rolesData[0][i].id);
      }
    });
  }
}

export default new ParseMod(connection);
