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
  init();
});

function init() {
  inquirer
    .prompt(//welcome, choose first action)
    .then(function (response) {
      //act with response data
    })
    .catch((err) => {
      if (err) throw err;
    });
}
