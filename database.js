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

// data object models
const Sequelize = require('sequelize');
const StudentModel = require('./models/student');
const ResultModel = require('./models/result');
const InstructorModel = require('./models/instructor');
const TestModel = require('./models/test');
const QuestionModel = require('./models/question');
// fix for working with windows
require('dotenv').config();

// instantiate database AWS
console.log("Environment Variables: ");
console.log(process.env.RDS_DB_NAME);
console.log(process.env.RDS_PORT);
console.log(process.env.RDS_USERNAME);
console.log(process.env.RDS_HOSTNAME);
console.log(process.env.RDS_USERNAME);
console.log(process.env.RDS_PASSWORD);



const sequelize = new Sequelize(process.env.RDS_DB_NAME,
    process.env.RDS_USERNAME, process.env.RDS_PASSWORD,
    {
        host: process.env.RDS_HOSTNAME,
        port: process.env.RDS_PORT,
        dialect: 'mysql'
    }
);

/*
console.log("Did sequelize initialize?:");
console.log(sequelize);
*/

/*
// instantiate database local testing environment
const path = require('path');
const dbpath = path.resolve(__dirname, 'data/storage.sqlite');
console.log(dbpath);
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbpath
});
*/

// instantiate data objects
const Student = StudentModel(sequelize, Sequelize);
const Result = ResultModel(sequelize, Sequelize);
const Test = TestModel(sequelize, Sequelize);
const Instructor = InstructorModel(sequelize, Sequelize);
const Question = QuestionModel(sequelize, Sequelize);

// create foriegn keys
Result.belongsTo(Student);
Test.belongsTo(Instructor);
Test.hasMany(Question);
Question.belongsTo(Test);
Instructor.hasMany(Test);
Instructor.hasMany(Student);
Student.hasMany(Result);

const APP_ENVIRONMENT = process.env.APP_ENVIRONMENT || "dev";
if (APP_ENVIRONMENT === "dev") {
    sequelize.sync({
        force: true
    })
    .then(() => {
        console.log(`Database sync successful - force: true`)
    });
} else {
    sequelize.sync({
        force: false
    })
    .then(() => {
        console.log(`Database sync successful - force: false`)
    });
}
// sync database




/*
    Export our DataModels for use in routes
*/
module.exports = {
    Student,
    Instructor,
    Result,
    Test,
    Question
};