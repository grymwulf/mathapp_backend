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




// module imports
const express = require('express');
const app = express();
const data = require ('./database');
const students = require('./routes/students');
const instructors = require('./routes/teachers');
const tests = require('./routes/tests');
const results = require ('./routes/results');
const apptest = require('./routes/apptest');
const questions = require ('./routes/questions');
const HttpStatus = require('http-status-codes');
const validator = require('express-openapi-validator').OpenApiValidator;
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocs = YAML.load('./mathapp.apiDocs.yaml');

require('dotenv').config();




// define true constants

const SERVER_PORT = process.env.PORT || 8000;

/*
    Middleware
*/
// express settings
app.set('trust proxy', true);

// initialize app settings
app.use(express.json());

/*
// troubleshooting
app.use(function (req,res,next) {
    console.log(req.url);
    console.log(req.ip);
    next();
});
*/

/*
    Routes
*/

app.use('/students', students);
app.use('/instructors', instructors);
app.use('/tests', tests);
app.use('/results', results);
app.use('/apptest', apptest);
app.use('/questions', questions);
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/*
    Set up OpenAPIValidator
*/
new validator({
    apiSpec: './mathapp.apiDocs.yaml',
})
    .install(app);

/*
    Express Error Handler
*/
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});

/*
    Default base route
*/
// default handler
// anything not implemented gets a response not implemented
// this HAS to be last in file to ensure it doesn't trigger on anything else that might match
app.use(function(req,res) {
    var result = {};
    result['data'] = {};
    result['responseCode'] = HttpStatus.NOT_IMPLEMENTED;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
    return;
});




/*
    Server
*/
// force ipv4
// app.listen(SERVER_PORT, '0.0.0.0', () => console.log(`Starting server, listening on ${SERVER_PORT}`));

// ipv6 compatible
app.listen(SERVER_PORT, () => console.log(`Starting server, listening on ${SERVER_PORT}`));
