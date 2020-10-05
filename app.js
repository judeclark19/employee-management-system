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
  showMainMenu();
}

function showMainMenu() {
  inquirer
    .prompt([
      {
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
      else {
        console.table(results);
        returnToMainMenu();
      }
    }
  );
}

function returnToMainMenu() {
  console.log("called returnToMainMenu");

  inquirer
    .prompt([
      {
        type: "list",
        name: "confirm",
        message: "Press enter to return to the main menu.",
        choices: ["MAIN MENU"],
      },
    ])
    .then(function (response) {
      // console.log(response.confirm);
      if (response.confirm) {
        showMainMenu();
      }
    })
    .catch(function (err) {
      if (err) throw err;
    });
  // inquirer
  //   .prompt([
  //     {
  //       type: "list",
  //       name: "returnMainMenu",
  //       choices: "Press enter to return to the main menu.",
  //     },
  //   ])
  //   .then(function (answer) {
  //     console.log(answer);
  //   })
  //   .catch((err) => {
  //     if (err) throw err;
  //   });
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
