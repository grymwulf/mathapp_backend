// module imports
const express = require('express');
const app = express();
const students = require('./routes/students');
const instructors = require('./routes/instructors');
const tests = require('./routes/tests');
const results = require ('./routes/results');
const path = require('path');

// data object models
const Sequelize = require('sequelize');
const StudentModel = require('./models/student');
const ResultModel = require('./models/result');
const InstructorModel = require('./models/instructor');
const TestModel = require('./models/test');

// instantiate database
var filename = path.basename('data/storage.sqlite');
console.log(filename);
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

// force syncing database
sequelize.sync({})
    .then(() => {
        console.log(`Database & tables created!`)
    });



// define true constants
const SERVER_PORT = 8000;

/*
    Middleware
*/

// troubleshooting
app.use(function (req,res,next) {
    console.log(req);
    next();
})

/*
    Routes
*/
/*
app.use('/doc', express.static('doc'));
app.use('/students', students);
app.use('/instructors', instructors);
app.use('/tests', tests);
app.use('/results', results);
*/


/*
    Export our DataModels for use in routes
*/
module.exports = {
    Student,
    Instructor,
    Result,
    Test
};
/*
    Server
*/

// start server
// app.listen(SERVER_PORT, () => console.log(`Starting server, listening on ${SERVER_PORT}`));