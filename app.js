var mysql = require("mysql");
var inquirer = require("inquirer");
var conTab = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "judespass",
  database: "employees_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  welcome();
});

function welcome() {
  console.log("WELCOME MESSAGE HERE");
  init();
}

function init() {
  inquirer
    .prompt([
      {
        //welcome, choose first action
        type: "list",
        name: "chooseAction",
        message: "Please choose an action:",
        choices: [
          "View all employees",
          "View all managers",
          "View all departments",
          "View all roles",
          "add",
          "remove",
          "update",
        ],
      },
    ])
    .then(function (response) {
      //act with response data
      console.log(response.chooseAction);
      if (response.chooseAction === "View all employees") {
        viewAllEmployees();
      } else if (response.chooseAction === "View all managers") {
        viewAllManagers();
      } else if (response.chooseAction === "View all departments") {
        viewAllDepartments();
      } else if (response.chooseAction === "View all roles") {
        viewAllRoles();
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
}

//FUNCTIONS
//================================================================
function viewAllEmployees() {
  connection.query("SELECT * FROM employees", function (err, results) {
    if (err) throw err;
    //success ACTION
    console.table(results);
  });
}

function viewAllManagers() {
  connection.query(
    "SELECT id, first_name, last_name, role_id FROM employees WHERE is_manager=1",
    function (err, results) {
      if (err) throw err;
      console.table(results);
    }
  );
}

function viewAllDepartments() {
  connection.query("SELECT * FROM departments", function (err, results) {
    if (err) throw err;
    //success ACTION
    console.table(results);
  });
}

function viewAllRoles() {
  connection.query("SELECT * FROM roles", function (err, results) {
    if (err) throw err;
    //success ACTION
    console.table(results);
  });
}
