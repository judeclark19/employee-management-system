import inquirer from "inquirer";
import connection from "../Database/connection.js";

var employeeNames = [];
var employeesIds = [];

class DeleteMod {
  constructor(connection) {
    this.connection = connection;
    this.employees = connection
      .promise()
      .query(
        "SELECT id, first_name, last_name FROM employees ORDER BY last_name"
      );
  }

  deleteAnEmployee() {
    // return connection.promise().query("SELECT * FROM employees");
    this.employees.then((employeesData) => {
      employeesData[0].forEach((employee) => {
        var fullName = employee.first_name + " " + employee.last_name;
        employeeNames.push(fullName);
        employeesIds.push(employee.id);
      });
      //   console.log(employeeNames);
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
      .then((response) => {
        console.log(response);
        console.log(employeeNames);
      })
      .catch((err) => {
        if (err) throw err;
      });

    return connection
      .promise()
      .query(
        "SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.salary, departments.name FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id ORDER BY employees.last_name"
      );
  }

  viewAllManagers() {
    return connection
      .promise()
      .query(
        "SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.salary, departments.name FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id WHERE employees.is_manager = 1 ORDER BY employees.last_name;"
      );
  }

  viewAllDepartments() {
    return connection.promise().query("SELECT name FROM departments");
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
