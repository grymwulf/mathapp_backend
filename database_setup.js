/*
    Copyright 2019 SER401 Project 14 Team - All Rights Reserved

    Team Members: 
    RAYMOND ACEVEDO
    SHAWN WEINER
    CHRISTOPHER SALAZAR
    ROBERT PILLITTERI
    SHELTON LACY 

    Unauthorized copying of this file, via any medium is strictly prohibited
    Proprietary and confidential
*/

const db = require('mysql2');
var fs = require('fs');
var readline = require('readline');
require('dotenv').config();


// Fill in the values for a MySQL user with privileges to create dtabase schema
const ADMIN_USER = "admin";
const ADMIN_PASSWORD = "admin_password";

// read .env file, if not filled out, use default values in .env_sample
// commenting next line out for testing
var MATHAPP_DB_NAME = process.env.RDS_DB_NAME || "mathapp";
var MATHAPP_DB_USER = process.env.RDS_USERNAME || "mathapp_api";
var MATHAPP_DB_PASSWORD = process.env.RDS_PASSWORD || "password_mathapp_api";

var connection = db.createConnection({
    host: 'localhost',
    port: '3306',
    user: ADMIN_USER,
    password: ADMIN_PASSWORD,
    multipleStatements: true
})

var db_create = `CREATE SCHEMA IF NOT EXISTS ${MATHAPP_DB_NAME};\n`;
var user_create = `CREATE USER IF NOT EXISTS '${MATHAPP_DB_USER}'@'%'`;
var user_password = `SET PASSWORD FOR '${MATHAPP_DB_USER}'@'%' =  '${MATHAPP_DB_PASSWORD}';`
var user_access = `GRANT ALL ON ${MATHAPP_DB_NAME}.* TO '${MATHAPP_DB_USER}'@'%'`
// this is callback hell, but it's a quick hack to do the deed
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connection made!");
    console.log("Executing: " + db_create);
    connection.query(db_create,
        function (err, result) {
            if (err) throw err;
            console.log("Database Created.");
        });
    console.log("Executing: " + user_create);
    connection.query(user_create,
        function(err, result) {
            if (err) throw err;
            console.log("User Dropped, already exists.");
        });
    console.log("Executing: " + user_password);
    connection.query(user_password,
        function(err, result) {
            if (err) throw err;
            console.log("User Created.");
        });
    console.log("Executing: " + user_access);
    connection.query(user_access,
        function (err, result) {
            if (err) throw err;
            console.log("User Access Granted.")
        });
    });

setTimeout((function () {
    return process.exit(0);
}), 1000);