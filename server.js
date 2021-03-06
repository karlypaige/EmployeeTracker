var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');
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

connection.connect(function (err) {
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
        .then(function (answer) {
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
                        .then(function (answer) {
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
                        .then(function (answer) {
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
                        .then(function (answer) {
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
    inquirer
        .prompt({
            name: "departmentAdd",
            type: "input",
            message: "Please enter your new department.",
        })
        .then(function (answer) {
            var query = "INSERT INTO department SET ?";
            console.log(answer.departmentAdd);
            connection.query(query, { name: answer.departmentAdd }, function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " department added!")

                //allow user to run another search if they want
                inquirer.prompt({
                    name: "rerun",
                    type: "confirm",
                    message: "Would you like another search?",
                })
                    .then(function (answer) {
                        if (answer.rerun === true) {
                            runSearch();
                        } else {
                            connection.end();
                            return;
                        }

                    })
            });
        })
};



function addRole() {
    inquirer
        .prompt([
            {
                name: "roleTitle",
                type: "input",
                message: "Please enter the name of the new role.",
            },
            {
                name: "roleSalary",
                type: "input",
                message: "Please enter the salary for the new role.",
            },
            {
                name: "roleDepartment_id",
                type: "input",
                message: "Please enter the department_id for the new role.",
            }
        ])
        .then(function (answer) {
            var query = "INSERT INTO role SET ?";
            connection.query(query,
                {
                    title: answer.roleTitle,
                    salary: answer.roleSalary,
                    department_id: answer.roleDepartment_id
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " role added!")

                    //allow user to run another search if they want
                    inquirer.prompt({
                        name: "rerun",
                        type: "confirm",
                        message: "Would you like another search?",
                    })
                        .then(function (answer) {
                            if (answer.rerun === true) {
                                runSearch();
                            } else {
                                connection.end();
                                return;
                            }

                        })
                });
        })
}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "employeeFName",
                type: "input",
                message: "Please enter new employee's first name",
            },
            {
                name: "employeeLName",
                type: "input",
                message: "Please enter new employee's last name",
            },
            {
                name: "employeeRole_id",
                type: "input",
                message: "Please enter the rolet_id for the new role.",
            },
            {
                name: "employeeManager",
                type: "input",
                message: "Please enter new Employee's supervisor id (or NULL if no supervisor assigned).",
            }
        ])
        .then(function (answer) {
            var query = "INSERT INTO employee SET ?";
            connection.query(query,
                {
                    first_name: answer.employeeFName,
                    last_name: answer.employeeLName,
                    role_id: answer.employeeRole_id,
                    manager_id: Number(answer.employeeManager)
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " role added!")

                    //allow user to run another search if they want
                    inquirer.prompt({
                        name: "rerun",
                        type: "confirm",
                        message: "Would you like another search?",
                    })
                        .then(function (answer) {
                            if (answer.rerun === true) {
                                runSearch();
                            } else {
                                connection.end();
                                return;
                            }

                        })
                });
        })
}

function viewDepartment() {
    //display all the departments
    var query = "SELECT id, name FROM department";
    connection.query(query, function (err, res) {
        var tableObj = [];
        for (var i = 0; i < res.length; i++) {
            tableObj.push({ID: res[i].id, Name: res[i].name});
        };
        
        console.log(cTable.getTable(tableObj));

        //allow user to run another search if they want
        inquirer.prompt({
            name: "rerun",
            type: "confirm",
            message: "Would you like another search?",
        })
            .then(function (answer) {
                if (answer.rerun === true) {
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
    connection.query(query, function (err, res) {
        var tableObj = [];
        for (var i = 0; i < res.length; i++) {
            tableObj.push({ID: res[i].id, Title: res[i].title, Salary: res[i].salary, Department: res[i].department_id});
        }

        console.log(cTable.getTable(tableObj));

        //allow user to run another search if they want
        inquirer.prompt({
            name: "rerun",
            type: "confirm",
            message: "Would you like another search?",
        })
            .then(function (answer) {
                if (answer.rerun === true) {
                    runSearch();
                } else {
                    connection.end();
                    return;
                }

            })
    });
}

function viewEmployee() {
    //dispaly all the employees
    var query = "SELECT id, first_name, last_name, role_id, manager_id FROM employee";
    tableObj =[];
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            tableObj.push({ID: res[i].id, First_name: res[i].first_name, Last_name: res[i].last_name, Role: res[i].role_id, Manager: res[i].manager_id});
        }

        console.log(cTable.getTable(tableObj));

        //allow user to run another search if they want
        inquirer.prompt({
            name: "rerun",
            type: "confirm",
            message: "Would you like another search?",
        })
            .then(function (answer) {
                if (answer.rerun === true) {
                    runSearch();
                } else {
                    connection.end();
                    return;
                }

            })
    });
}

function updateDepartment() {
    inquirer
        .prompt([
            {
                name: "departmentUpdate",
                type: "input",
                message: "Please enter department you wish to update.",
            },
            {
                name: "departmentNew",
                type: "input",
                message: "Please enter the updated department name.",
            }
        ])
        .then(function (answer) {
            var query = "UPDATE department SET ? WHERE ?";
            console.log(answer.departmentAdd);
            connection.query(query, [
                {
                    name: answer.departmentNew
                },
                {
                    name: answer.departmentUpdate
                }
            ], function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " department updated!")

                //allow user to run another search if they want
                inquirer.prompt({
                    name: "rerun",
                    type: "confirm",
                    message: "Would you like another search?",
                })
                    .then(function (answer) {
                        if (answer.rerun === true) {
                            runSearch();
                        } else {
                            connection.end();
                            return;
                        }

                    })
            });
        })
}

function updateRole() {
    inquirer
        .prompt([
            {
                name: "roleUpdate",
                type: "input",
                message: "Please enter the role you wish to update.",
            },
            {
                name: "roleField",
                type: "rawlist",
                message: "Which field needs updating?",
                choices: ["title", "salary", "department_id"]
            },
            {
                name: "roleNew",
                type: "input",
                message: "Please enter the new value.",
            }
        ])
        .then(function (answer) {
            console.log(answer.roleField)
            var query = "UPDATE role SET ? WHERE ?";
            switch (answer.roleField) {
                case "title":
                    connection.query(query, [
                        {
                            title: answer.roleNew
                        },
                        {
                            title: answer.roleUpdate
                        }
                    ], function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " role updated!")
                    });
                    break;

                case "salary":
                    connection.query(query, [
                        {
                            salary: answer.roleNew
                        },
                        {
                            title: answer.roleUpdate
                        }
                    ], function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " role updated!")
                    });
                    break;

                case "department_id":
                    connection.query(query, [
                        {
                            department_id: answer.roleNew
                        },
                        {
                            title: answer.roleUpdate
                        }
                    ], function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " role updated!")
                    });
                    break;
            }

            //allow user to run another search if they want
            inquirer.prompt({
                name: "rerun",
                type: "confirm",
                message: "Would you like another search?",
            })
                .then(function (answer) {
                    if (answer.rerun === true) {
                        runSearch();
                    } else {
                        connection.end();
                        return;
                    }

                })
        });
}

function updateEmployee() {
    inquirer
        .prompt([
            {
                name: "employeeUpdate",
                type: "input",
                message: "Please enter the employee_id you wish to update.",
            },
            {
                name: "employeeField",
                type: "rawlist",
                message: "Which field needs updating?",
                choices: ["first_name", "last_name", "role_id", "manager_id"]
            },
            {
                name: "employeeNew",
                type: "input",
                message: "Please enter the new value.",
            }
        ])
        .then(function (answer) {
            console.log(answer.employeeField)
            var query = "UPDATE employee SET ? WHERE ?";
            switch (answer.employeeField) {
                case "first_name":
                    connection.query(query, [
                        {
                            first_name: answer.employeeNew
                        },
                        {
                            id: answer.employeeUpdate
                        }
                    ], function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " employee updated!")
                    });
                    break;

                case "last_name":
                    connection.query(query, [
                        {
                            last_name: answer.employeeNew
                        },
                        {
                            id: answer.employeeUpdate
                        }
                    ], function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " employee updated!")
                    });
                    break;

                case "role_id":
                    connection.query(query, [
                        {
                            role_id: answer.employeeNew
                        },
                        {
                            id: answer.employeeUpdate
                        }
                    ], function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " employee updated!")
                    });
                    break;

                case "manager_id":
                    connection.query(query, [
                        {
                            manager_id: answer.employeeNew
                        },
                        {
                            id: answer.employeeUpdate
                        }
                    ], function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " employee updated!")
                    });
                    break;
            }

            //allow user to run another search if they want
            inquirer.prompt({
                name: "rerun",
                type: "confirm",
                message: "Would you like another search?",
            })
                .then(function (answer) {
                    if (answer.rerun === true) {
                        runSearch();
                    } else {
                        connection.end();
                        return;
                    }

                })
        });
}
