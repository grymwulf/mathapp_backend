// module imports
const express = require('express');
const app = express();
const students = require('./routes/students');
const instructors = require('./routes/instructors');
const tests = require('./routes/tests');
const results = require ('./routes/results');
const data = require ('./database');




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
app.use('/doc', express.static('doc'));
app.use('/students', students);
app.use('/instructors', instructors);
app.use('/tests', tests);
app.use('/results', results);




/*
    Server
*/

app.listen(SERVER_PORT, () => console.log(`Starting server, listening on ${SERVER_PORT}`));