import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "judespass",

  database: "employees_db",
});

connection.connect(function (err) {
  if (err) throw err;
});

export default connection;
