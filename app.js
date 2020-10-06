// var mysql = require("mysql");
// import mysql from "mysql";
// var inquirer = require("inquirer");
import inquirer from "inquirer";
// var conTab = require("console.table");
import figlet from "figlet";
// const ViewMod = require("");
import viewMod from "./custom_modules/view_functions.js";
import addMod from "./custom_modules/add_functions.js";
import { testArray } from "./custom_modules/test_mod.js";
import connection from "./Database/connection.js";

//checking module connections
// console.log(viewMod);
// console.log("TEST ARRAY!!!");
// console.log(testArray);
welcome();
function welcome() {
  // console.log("WELCOME MESSAGE HERE");
  console.log(
    figlet.textSync("EMS", {
      font: "isometric3",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    })
  );
  console.log("Welcome to the Employee Management System.");
  showMainMenu();
}

function showMainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "chooseAction",
        message: "Please choose a submenu to see possible actions:",
        choices: ["VIEW", "ADD", "REMOVE", "UPDATE", "EXIT"],
      },
    ])
    .then(function (response) {
      if (response.chooseAction === "VIEW") {
        // viewAllEmployees();
        inquirer
          .prompt([
            {
              type: "list",
              name: "viewAction",
              message: "Choose a view action:",
              choices: [
                "View all employees",
                "View all managers",
                "View all departments",
                "View all roles",
              ],
            },
          ])
          .then(async (response) => {
            //act on response
            console.log(response.viewAction);

            if (response.viewAction === "View all employees") {
              const [rows] = await viewMod.viewAllEmployees();
              console.table(rows);
              returnToMainMenu();
            } else if (response.viewAction === "View all managers") {
              const [rows] = await viewMod.viewAllManagers();
              console.table(rows);
              returnToMainMenu();
            } else if (response.viewAction === "View all departments") {
              const [rows] = await viewMod.viewAllDepartments();
              console.table(rows);
              returnToMainMenu();
            } else if (response.viewAction === "View all roles") {
              const [rows] = await viewMod.viewAllRoles();
              console.table(rows);
              returnToMainMenu();
            }
          })
          .catch((err) => {
            if (err) throw err;
          });
      }
      if (response.chooseAction === "ADD") {
        inquirer
          .prompt([
            {
              type: "list",
              name: "addAction",
              message: "Choose an add action:",
              choices: ["Add an employee", "Add a department", "Add a role"],
            },
          ])
          .then(async (response) => {
            if (response.addAction === "Add an employee") {
              console.log(
                "Enter the following information for the new employee:"
              );
              addMod.addEmployee();

              // const [rows] = await addMod.addEmployee();
              // console.table(rows);
              // returnToMainMenu();
            } else if (response.addAction === "Add a department") {
              addMod.addDepartment();
              // const [rows] = await addMod.addDepartment();
              // console.table(rows);
              // returnToMainMenu();
            } else if (response.addAction === "Add a role") {
              addMod.addRole();
              // returnToMainMenu();
            }
          })
          .catch((err) => {
            if (err) throw err;
          });
      } else if (response.chooseAction === "EXIT") {
        connection.end();
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
  // returnToMainMenu();
}

//NAV FUNCTIONS
//================================================================

async function returnToMainMenu() {
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
      if (response.confirm) {
        showMainMenu();
      }
    })
    .catch(function (err) {
      if (err) throw err;
    });
}

//VIEW FUNCTIONS
//================================================================

// function viewAllEmployees() {
//   connection.query("SELECT * FROM employees", function (err, results) {
//     if (err) throw err;
//     //success ACTION
//     else {
//       console.table(results);
//       returnToMainMenu();
//     }
//   });
// }

// function viewAllManagers() {
//   connection.query(
//     "SELECT id, first_name, last_name, role_id FROM employees WHERE is_manager=1",
//     function (err, results) {
//       if (err) throw err;
//       else {
//         console.table(results);
//         returnToMainMenu();
//       }
//     }
//   );
// }

// function viewAllDepartments() {
//   connection.query("SELECT * FROM departments", function (err, results) {
//     if (err) throw err;
//     //success ACTION
//     else {
//       console.table(results);
//       returnToMainMenu();
//     }
//   });
// }

// function viewAllRoles() {
//   connection.query("SELECT * FROM roles", function (err, results) {
//     if (err) throw err;
//     //success ACTION
//     else {
//       console.table(results);
//       returnToMainMenu();
//     }
//   });
// }

//INSERT FUNCTIONS
//================================================================
