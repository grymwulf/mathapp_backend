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
router.get('/:id', function(req, res, next) {
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
        }).catch(function (err) {
            console.log('Error querying a student');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/:id`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
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
        }).catch(function (err) {
            console.log('Error querying all tests');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = "/tests";
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
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
    }).catch(function (err) {
        console.log('Error creating new test record');
        console.log(err)
        result['data'] = {};
        result['endpoint'] = "/tests";
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
    });
});

// default handler
// anything not implemented gets a response not implemented
// this HAS to be last in file to ensure it doesn't trigger on anything else that might match
router.use(function(req, res, next) {
    var result = {};
    result['data'] = {
        "endpoint" : "/tests"
    };
    result['responseCode'] = HttpStatus.NOT_IMPLEMENTED;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
});

// required to make routes work
module.exports = router;