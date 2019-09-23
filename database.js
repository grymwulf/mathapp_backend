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