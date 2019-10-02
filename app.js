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
// express settings
app.set('trust proxy', true);

// troubleshooting
app.use(function (req,res,next) {
    console.log(req.url);
    console.log(req.ip);
    next();
});

/*
    Routes
*/
app.use('/doc', express.static('doc'));
app.use('/students', students);
app.use('/instructors', instructors);
app.use('/tests', tests);
app.use('/results', results);

/*
    Default base route
*/
// default handler
// anything not implemented gets a response not implemented
// this HAS to be last in file to ensure it doesn't trigger on anything else that might match
app.use(function(req,res) {
    var result = {};
    result['data'] = {};
    result['responseCode'] = 501;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
    return;
});




/*
    Server
*/
// force ipv4
app.listen(SERVER_PORT, '0.0.0.0', () => console.log(`Starting server, listening on ${SERVER_PORT}`));

// ipv6 compatible
// app.listen(SERVER_PORT, () => console.log(`Starting server, listening on ${SERVER_PORT}`));
