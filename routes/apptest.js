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

console.log(data);

const all_instructors = data.Instructor.findAll();
const all_tests = data.Test.findAll();
const all_results = data.Result.findAll();
const all_students = data.Student.findAll();


// default handler
// anything not implemented gets a response not implemented
// this HAS to be last in file to ensure it doesn't trigger on anything else that might match
router.use(function (req, res) {
    var result = {};
    var db_data = {};
    console.log("starting promise");
    Promise
        .all([all_instructors, all_tests, all_results,all_students ])
        .then( db_data => {
            result['data'] = {
                "endpoint": "apptest",
                "payload": "You've got to apptest successfully, and the promises resolved",
                "data": db_data
            };
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "SUCCESS";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
        .catch((err) => {
            result['data'] = {
                "endpoint": "apptest",
                "payload": "Error was thrown",
                "data": err
            };
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = 'INTERNAL_SERVER_ERROR';
            res.status(result.responseCode);
            res.json(result);
            return;
        });
});

// required to make routes work
module.exports = router;