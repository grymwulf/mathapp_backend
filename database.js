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

// instantiate database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'data/storage.sqlite'
});

// instantiate data objects
const Student = StudentModel(sequelize, Sequelize);
const Result = ResultModel(sequelize, Sequelize);
const Test = TestModel(sequelize, Sequelize);
const Instructor = InstructorModel(sequelize, Sequelize);

// create foriegn keys
Result.belongsTo(Student);

// sync database
sequelize.sync({})
    .then(() => {
        console.log(`Database sync successful`)
    });



/*
    Export our DataModels for use in routes
*/
module.exports = {
    Student,
    Instructor,
    Result,
    Test
};