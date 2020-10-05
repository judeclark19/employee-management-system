CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (30),
    PRIMARY KEY (id)
);

INSERT INTO
    departments (name)
VALUES
    ('Engineering'),
    ('Marketing'),
    ('Sales'),
    ('Research and Development'),
    ('Human Resources');

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (30),
    salary DECIMAL (8, 2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    PRIMARY KEY (id)
);

INSERT INTO
    roles (title, salary, department_id)
VALUES
    ('Design Engineer', 110000, 1),
    ('Director of HR', 117800, 5),
    ('Director of Marketing', 177000, 2),
    ("HR Analyst", 70000, 5),
    ("HR Associate", 61700, 5),
    ("Manager", 131200, 1),
    ("Manager", 131200, 2),
    ("Manager", 131200, 3),
    ("Manager", 131200, 4),
    ("Manager", 131200, 5),
    ("Marketing Analyst", 174000, 2),
    ("Marketing Coordinator", 156900, 2),
    ("Office Assistant", 51300, 2),
    ("Office Assistant", 51300, 4),
    ("R&D Associate", 134300, 4),
    ("Sales Associate", 116300, 3),
    ("Sales Executive", 192500, 3),
    ("Senior Developer", 140600, 1),
    ("Senior Quality Engineer", 108900, 1),
    ("Structural Engineer", 98000, 1);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30) NULL,
    last_name VARCHAR (30) NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id),
    PRIMARY KEY (id)
);

INSERT INTO
    employees (first_name, last_name, role_id)
VALUES
    ("Marv", "Kent", 10),
    ("Theodore", "Billingsly", 6),
    ("Rudy", "Harlett", 18),
    ("Blake", "McKernon", 5),
    ("Jared", "Bastock", 9),
    ("Katy", "Teasell", 17),
    ("Laney", "Abbatucci", 7),
    ("Elsa", "Kenrat", 8),
    ("Georgia", "Bortolini", 13),
    ("Lottie", "Whybrow", 4),
    ("Hermine", "Goldhill", 2),
    ("Derrick", "Garr", 16),
    ("Jedediah", "Benito", 12),
    ("Yelena", "Negri", 15),
    ("Antonetta", "Moir", 20),
    ("Eleanor", "Sinclair", 5),
    ("Harriet", "Bilbey", 15),
    ("Loni", "Kildahl", 3),
    ("Dur", "Allsobrook", 15),
    ("Erica", "Rodriguez", 16),
    ("Revkah", "Seamer", 14),
    ("Constantin", "Duprey", 1),
    ("Allyn", "Povah", 11),
    ("Stefanie", "Midlar", 19),
    ("Enrika", "Soaper", 16);

UPDATE
    employees
SET
    manager_id = 1
WHERE
    id in (4, 10, 6);

UPDATE
    employees
SET
    manager_id = 2
WHERE
    id in (3, 22, 24);

UPDATE
    employees
SET
    manager_id = 5
WHERE
    id in (14, 17, 19, 21);

UPDATE
    employees
SET
    manager_id = 6
WHERE
    id = 2;

UPDATE
    employees
SET
    manager_id = 7
WHERE
    id in (9, 13, 23);

UPDATE
    employees
SET
    manager_id = 8
WHERE
    id in (12, 20, 25);

UPDATE
    employees
SET
    manager_id = 11
WHERE
    id = 1;

UPDATE
    employees
SET
    manager_id = 15
WHERE
    id = 8;

UPDATE
    employees
SET
    manager_id = 18
WHERE
    id = 7;