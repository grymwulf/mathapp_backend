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
const HttpStatus = require('http-status-codes');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocs = YAML.load('./mathapp.apiDocs.yaml');
const OpenApiValidator = require('express-openapi-validator').OpenApiValidator;

const bodyParser = require('body-parser');
const logger = require('morgan');

require('dotenv').config();

// load & Parse api spec
const apiSpecJSON = YAML.load('./mathapp.apiDocs.yaml');
new OpenApiValidator({
    apiSpec: './mathapp.apiDocs.yaml',
    }).install(app)
const router = express.Router();

// define true constants

const SERVER_PORT = process.env.PORT || 8000;

/*
    Middleware
*/
// express settings, register middleware
// body parser is supposed to be called first, don't recall why
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.set('trust proxy', true);
app.use(express.json());



/*
    Routes
*/

router.use('/students', students);
router.use('/instructors', instructors);
router.use('/tests', tests);
router.use('/results', results);
app.use('/apptest', apptest);
router.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

new OpenApiValidator({
    apiSpec: './mathapp.apiDocs.yaml',
    }).install(app)
    .then(() => {
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
    Default base route
*/
/*
// default handler
// anything not implemented gets a response not implemented
// this HAS to be last in file to ensure it doesn't trigger on anything else that might match
app.use(function(req, res, next) {
    var result = {};
    result['data'] = {};
    result['responseCode'] = HttpStatus.NOT_IMPLEMENTED;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
});
*/



/*
    Server
*/
// force ipv4
// app.listen(SERVER_PORT, '0.0.0.0', () => console.log(`Starting server, listening on ${SERVER_PORT}`));

// ipv6 compatible
app.listen(SERVER_PORT, () => console.log(`Starting server, listening on ${SERVER_PORT}`));
