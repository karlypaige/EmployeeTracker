-- Drops the task_saver_db if it already exists --
DROP DATABASE IF EXISTS tracker_db;

-- Create the database task_saver_db and specified it for use.
CREATE DATABASE tracker_db;

USE tracker_db;

-- Create the table tasks.
CREATE TABLE department (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  salary decimal,
  department_id int,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id int,
  manager_id int,
  PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO department (name) 
    VALUES ('Sales'), 
        ('Marketing'), 
        ('Development'), 
        ('Procurement'), 
        ('Human Resources');
INSERT INTO role (title, salary, department_id) 
    VALUES ('Sales Manager', 120000,1),
        ('Sales Staff', 80000,1),
        ('Manager', 160000,2),
        ('Senior Developer', 120000,2),
        ('Developer', 90000,2),
        ('Buyer', 75000,3),
        ('Senior HR', 90000,4),
        ('HR Generalist', 60000,4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
    VALUES ('Judy', 'Bloom', 1, NULL),
        ('Kurt', 'Vonnegut', 2, 1),
        ('Karly', 'Maruyama', 3, NULL),
        ('John', 'Smith', 4, 3),
        ('Brian', 'Green', 5, 4),
        ('Nadia', 'Comaneci', 6, NULL),
        ('Bart Conner', '', 7, NULL),
        ('Shannon', 'Miller', 8, 7),
        ('Simone', 'Biles', 5, 4),
        ('Shawn', 'Johnson', 2, 1),
        ('Olga', 'Korbut', 8, 7);

SELECT * FROM department as d
JOIN role as r ON d.id = r.department_id
JOIN employee as e on e.role_id = r.id;