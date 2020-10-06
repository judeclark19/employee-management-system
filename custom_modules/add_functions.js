import connection from "../Database/connection.js";
import inquirer from "inquirer";

class AddMod {
  constructor(connection) {
    this.connection = connection;
  }

  addEmployee() {
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
          choices: ["Fake Role1", "Fake Role2", "Fake Role3"],
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
        console.log(
          response.newEmployeeFirstName,
          response.newEmployeeLastName
        );
        connection
          .promise()
          .query(
            `INSERT INTO employees (first_name, last_name) VALUES ? `,
            [
              `${response.newEmployeeFirstName}`,
              `${response.newEmployeeLastName}`,
            ],
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
