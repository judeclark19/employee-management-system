import inquirer from "inquirer";
import figlet from "figlet";
import viewMod from "./custom_modules/view_functions.js";
import addMod from "./custom_modules/add_functions.js";
import updateMod from "./custom_modules/update_functions.js";
import deleteMod from "./custom_modules/delete_functions.js";
import connection from "./Database/connection.js";

welcome();
function welcome() {
  console.log(
    figlet.textSync("EMS", {
      font: "isometric3",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    })
  );
  console.log("\n\nWelcome to the Employee Management System.\n\n");
  showMainMenu();
}

function showMainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "chooseAction",
        message: "Please choose a submenu to see possible actions:",
        choices: ["VIEW", "ADD", "UPDATE", "EXIT APPLICATION"],
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
                "BACK",
              ],
            },
          ])
          .then(async (response) => {
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
            } else if (response.viewAction === "BACK") {
              showMainMenu();
            }
          })
          .catch((err) => {
            if (err) throw err;
          });
      } else if (response.chooseAction === "ADD") {
        inquirer
          .prompt([
            {
              type: "list",
              name: "addAction",
              message: "Choose an add action:",
              choices: [
                "Add an employee",
                "Add a department",
                "Add a role",
                "BACK",
              ],
            },
          ])
          .then(async (response) => {
            if (response.addAction === "Add an employee") {
              console.log(
                "Enter the following information for the new employee:"
              );
              addMod.addEmployee();
            } else if (response.addAction === "Add a department") {
              addMod.addDepartment();
            } else if (response.addAction === "Add a role") {
              addMod.addRole();
            } else if (response.addAction === "BACK") {
              showMainMenu();
            }
          })
          .catch((err) => {
            if (err) throw err;
          });
      } else if (response.chooseAction === "REMOVE") {
        inquirer
          .prompt([
            {
              type: "list",
              name: "deleteAction",
              message: "Choose a delete action:",
              choices: ["Delete an employee", "Delete a department"],
            },
          ])
          .then((response) => {
            if (response.deleteAction === "Delete an employee") {
              deleteMod.deleteAnEmployee();
            }
          });
      } else if (response.chooseAction === "UPDATE") {
        updateMod.updateEmployeeRole();
      } else if (response.chooseAction === "EXIT APPLICATION") {
        connection.end();
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
}

export default async function returnToMainMenu() {
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
