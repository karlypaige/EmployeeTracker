var mysql = require('mysql');
var inquirer = require ('inquirer');
var console = require('console');
var password = require('../Assets/password.js')

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: process.env.PORT || 3306,

    // Your username
    user: "root",

    // Your password
    password: password.getPassword(),
    database: "tracker_db"
});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add data",
                "View data",
                "Update data",
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
            case "Add data":
                console.log("you chose to add data");

                inquirer
                .prompt({
                    name: "add",
                    type: "rawlist",
                    message: "What would you like to add?",
                    choices: [
                        "Add department",
                        "Add role",
                        "Add employee",
                    ]
                })
                .then(function(answer) {
                    switch (answer.add) {
                        case "Add department":
                            addDepartment();
                            break;
                        case "Add role":
                            addRole();
                            break;
                        case "Add employee":
                            addEmployee();
                            break;
                    }
                });
                break;

            case "View data":
                inquirer
                .prompt({
                    name: "view",
                    type: "rawlist",
                    message: "What would you like to view?",
                    choices: [
                        "View department",
                        "View role",
                        "View employee",
                    ]
                })
                .then(function(answer) {
                    switch (answer.view) {
                        case "View department":
                            viewDepartment();
                            break;
                        case "View role":
                            viewRole();
                            break;
                        case "View employee":
                            viewEmployee();
                            break;
                    }
                });
                break;

            case "Update data":
                inquirer
                .prompt({
                    name: "update",
                    type: "rawlist",
                    message: "What would you like to update?",
                    choices: [
                        "Update department",
                        "Update role",
                        "Update employee",
                    ]
                })
                .then(function(answer) {
                    switch (answer.update) {
                        case "Update department":
                            updateDepartment();
                            break;
                        case "Update role":
                            updateRole();
                            break;
                        case "Update employee":
                            updateEmployee();
                            break;
                    }
                });
                break;

            }
        });
}


function addDepartment() {
    console.log("you are in addDepartment function");
}

function addRole() {
    console.log("you are in addRole function");
}

function addEmployee () {
    console.log("you are in addEmployee function");
}

function viewDepartment() {
    //display all the departments
      var query = "SELECT id, name FROM department";
      connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("ID: " + res[i].id + " || Name: " + res[i].name);
        }
        //allow user to run another search if they want
        inquirer.prompt({
            name: "rerun",
            type: "confirm",
            message: "Would you like another search?",
        })
        .then(function(answer) {
            if(answer.rerun === true) {
                runSearch(); 
            } else {
                connection.end();
                return;
            }
           
        })
      });
}

function viewRole() {
    //display all the roles
    var query = "SELECT id, title, salary, department_id FROM role";
      connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("ID: " + res[i].id + " || Title: " + res[i].title + " || Salary: " + res[i].salary + " || Department: " + res[i].department_id);
        }
        //allow user to run another search if they want
        inquirer.prompt({
            name: "rerun",
            type: "confirm",
            message: "Would you like another search?",
        })
        .then(function(answer) {
            if(answer.rerun === true) {
                runSearch(); 
            } else {
                connection.end();
                return;
            }
           
        })
      });
}

function viewEmployee () {
    //dispaly all the employees
    var query = "SELECT id, first_name, last_name, role_id, manager_id FROM employee";
      connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("ID: " + res[i].id + " || First name: " + res[i].first_name + " || Last name: " + res[i].last_name + " || Role: " + res[i].role_id + " || Manager: " + res[i].manager_id);
        }
        //allow user to run another search if they want
        inquirer.prompt({
            name: "rerun",
            type: "confirm",
            message: "Would you like another search?",
        })
        .then(function(answer) {
            if(answer.rerun === true) {
                runSearch(); 
            } else {
                connection.end();
                return;
            }
           
        })
      });
}

function updateDepartment() {
    console.log("you are in updateDepartment function");
}

function updateRole() {
    console.log("you are in updateRole function");
}

function updateEmployee () {
    console.log("you are in updateEmployee function");
}
