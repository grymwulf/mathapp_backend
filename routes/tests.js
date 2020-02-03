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

// basic getter to get record by primary key
router.get('/:id', function(req,res) {
    var result = {};
    data.Test.findAll({
            where: {
                id: req.params.id
            }
        })
        .then( testData => {
            result['data'] = testData;
            result['endpoint'] = `/tests/:id`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a student');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/:id`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

// basic getter to get all tests by category
router.get('/category/:category', function(req,res) {
    var result = {};
    data.Test.findAll({
            where: {
                category: req.params.category
            },
        })
        .then( testData => {
            result['data'] = testData;
            result['endpoint'] = `/tests/category/:category`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a student');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/category/:category`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

// basic getter to get record by level
router.get('/:level', function(req,res) {
    var result = {};
    data.Test.findAll({
            where: {
                id: req.params.id
            }
        })
        .then( testData => {
            result['data'] = testData;
            result['endpoint'] = `/tests/:level`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a student');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/:level`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

// basic getter to get record by attempts remaining
router.get('/:attempts_remaining', function(req,res) {
    var result = {};
    data.Test.findAll({
            where: {
                id: req.params.id
            }
        })
        .then( testData => {
            result['data'] = testData;
            result['endpoint'] = `/tests/:attempts_remaining`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a student');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/:attempts_remaining`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});


// basic getter to get record by teacher id
router.get('/teacher/:teacherId', function(req,res) {
    var result = {};
    data.Test.findAll({
            where: {
                id: req.params.id
            }
        })
        .then( testData => {
            result['data'] = testData;
            result['endpoint'] = `tests/teacher/:teacherId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a student');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `tests/teacher/:teacherId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

// basic getter to get record by student id
router.get('/student/studentId', function(req,res) {
    var result = {};
    data.Test.findAll({
            where: {
                id: req.params.id
            }
        })
        .then( testData => {
            result['data'] = testData;
            result['endpoint'] = `tests/student/:studentId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a student');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `tests/student/:studentId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

// implementing a basic getter to get all known tests in the DB
router.get('/', function (req, res) {
    var result = {};
    data.Test.findAll({
            raw: true
        })
        .then(function (tests) {
            result['data'] = tests;
            result['endpoint'] = "/tests";
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            tests.forEach(element => {
                element.data = JSON.parse(element.data)
            });
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying all tests');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = "/tests";
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
}) 


// get data store it, return a URI + id for stored data
router.post('/', function (req, res) {
    var result = {};
    console.log(`Post: `);
    console.log(req.body);
    data.Test.create({
        "data": JSON.stringify(req.body)
    }).then(newTest => {
        console.log(`New test data received: Entry ${newTest.id} created.`);
        console.log(`Data added was: ${newTest.data}.`);
        var uri = req.protocol + '://' + req.get('host') +
            req.baseUrl + req.path + newTest.id;
        result['data'] = {
            'id': newTest.id,
            'uri': uri
        };
        result['endpoint'] = "/tests";
        result['responseCode'] = HttpStatus.CREATED;
        result['response'] = "Created"
        res.status(result.responseCode);
        res.header('Location', uri);
        res.json(result);
        return;
    }).catch(function (err) {
        console.log('Error creating new test record');
        console.log(err)
        result['data'] = {};
        result['endpoint'] = "/tests";
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
})

// default handler
// anything not implemented gets a response not implemented
// this HAS to be last in file to ensure it doesn't trigger on anything else that might match
router.use(function(req,res) {
    var result = {};
    result['data'] = {
        "endpoint" : "/tests"
    };
    result['responseCode'] = HttpStatus.NOT_IMPLEMENTED;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
    return;
});

// required to make routes work
module.exports = router;