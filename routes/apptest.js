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

const express = require('express');
const router = express.Router();
const data = require('../database');
const HttpStatus = require('http-status-codes');



// default handler
// anything not implemented gets a response not implemented
// this HAS to be last in file to ensure it doesn't trigger on anything else that might match
router.use(async function (req, res) {
    var result = {};
    var data = {};
    await data.Instructor.findAll()
        .then(function (instructors) {
            data['instructors'] = instructors;
        });
    await data.Results.findAll()
        .then(function (results) {
            data['results'] = results;
        });
    await data.Tests.findAll()
        .then(function (tests) {
            data['tests'] = tests;
        });
    await data.Students.findAll()
        .then(function (students) {
            data['students'] = students;
        });
    result['data'] = {
        "endpoint": "apptest",
        "payload": "You've successfully reached the apptest endpoint.",
        "data" : data
    };
    result['responseCode'] = HttpStatus.OK;
    result['response'] = "SUCCESS";
    res.status(result.responseCode);
    res.json(result);
    return;
});

// required to make routes work
module.exports = router;