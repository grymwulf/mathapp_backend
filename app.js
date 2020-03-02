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
const teachers = require('./routes/teachers');
const tests = require('./routes/tests');
const results = require ('./routes/results');
const apptest = require('./routes/apptest');
const HttpStatus = require('http-status-codes');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocs = YAML.load('./mathapp.apiDocs.yaml');
const router = express.Router();

// OpenApiValidator required modules
const OpenApiValidator = require('express-openapi-validator').OpenApiValidator;
const bodyParser = require('body-parser');
const logger = require('morgan');

// load & Parse api spec
const apiSpecJSON = YAML.load('./mathapp.apiDocs.yaml');

// define true constants

const SERVER_PORT = process.env.PORT || 8000;

/*
Middleware
*/
// body parser is supposed to be called first, don't recall why
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// express settings
app.set('trust proxy', true);

// Bypass routing
app.use('/apptest', apptest);

/*
Routes
*/
router.use('/students', students);
router.use('/teachers', teachers);
router.use('/tests', tests);
router.use('/results', results);
router.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// process routing through OpenApiValidator
new OpenApiValidator({
    apiSpec: './mathapp.apiDocs.yaml',
}).install(app)
.then(() => {
    // App use bypass routing
    app.use('/api/v1', router);                
    app.use('/', router);
})

/*
Error handler
*/
app.use((err, req, res, next) => {
    res.status(err.status).json({
        errors: err.errors,
    });
});



/*
Server
*/
// force ipv4
// app.listen(SERVER_PORT, '0.0.0.0', () => console.log(`Starting server, listening on ${SERVER_PORT}`));

// ipv6 compatible
app.listen(SERVER_PORT, () => 
    console.log(`Starting server, listening on ${SERVER_PORT}`));
