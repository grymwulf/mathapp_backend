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
router.get('/:id', function(req,res, next) {
    var result = {};
    data.Result.findAll({
            where: {
                id: req.params.id
            }
        })
        .then( resultData => {
            result['data'] = resultData;
            result['endpoint'] = `/results/:id`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
        }).catch(function (err) {
            console.log('Error querying a student');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/results/:id`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
        })
});

// get all results
router.get('/', function(req, res, next) {
    var result = {};

    data.Result.findAll({
            raw: true
        })
        .then(function(results) {
            result['data'] = results;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            results.forEach(element => {
                element.data = JSON.parse(element.data)
            });
            res.json(result);
        })
        .catch(function(err){
            console.log('Error querying all results');
            console.log(err)
            result['data'] = {};
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
        })
});

// post data to endpoint
router.post('/', function (req, res, next) {
    var result = {};
    console.log(`Post: `);
    console.log(req.body);
    data.Result.create({
        "data": JSON.stringify(req.body)
    }).then(newResult => {
        console.log(`New result data received: Entry ${newResult.id} created.`);
        console.log(`Data added was: ${newResult.data}.`);
        var uri = req.protocol + '://' + req.get('host') +
            req.baseUrl + req.path + newResult.id;
        result['data'] = {
            'id': newResult.id,
            'uri': uri
        };
        result['endpoint'] = "/result";
        result['responseCode'] = HttpStatus.CREATED;
        result['response'] = "Created"
        res.status(result.responseCode);
        res.header('Location', uri);
        res.json(result);
    }).catch(function (err) {
        console.log('Error creating new result record');
        console.log(err)
        result['data'] = {};
        result['endpoint'] = "/result";
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
    })
})

// default handler
// anything not implemented gets a response not implemented
// this HAS to be last in file to ensure it doesn't trigger on anything else that might match
router.use(function(req, res, next) {
    var result = {};
    result['data'] = {
        "endpoint" : "/results"
    };
    result['responseCode'] = HttpStatus.NOT_IMPLEMENTED;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
});

// required to make routes work
module.exports = router;