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
    data.Question.findAll({
            where: {
                id: req.params.id
            }
        })
        .then( questionData => {
            result['data'] = questionData;
            result['endpoint'] = `/questions/:id`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a student');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/questions/:id`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

// basic getter
router.get('/', function(req,res) {
    var result = {};
    data.Question.findAll({
            raw: true
        })
        .then(function (questions) {
            result['data'] = questions;
            result['endpoint'] = "/instructors";
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            questions.forEach(element => {
                element.data = JSON.parse(element.data)
            });
            res.json(result);
            return;
        }).catch(function(err){
            console.log('Error querying all instructors');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = "/instructors";
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

// post data to endpoint
router.post('/', function (req, res) {
    var result = {};
    console.log(`Post: `);
    console.log(req.body);
    data.Question.create({
        "data": JSON.stringify(req.body)
    }).then(newQuestion => {
        console.log(`New question data received: Entry ${newQuestion.id} created.`);
        console.log(`Data added was: ${newQuestion.data}.`);
        var uri = req.protocol + '://' + req.get('host') +
            req.baseUrl + req.path + newQuestion.id;
        result['data'] = {
            'id': newQuestion.id,
            'uri': uri
        };
        result['endpoint'] = "/questions";
        result['responseCode'] = HttpStatus.CREATED;
        result['response'] = "Created"
        res.status(result.responseCode);
        res.header('Location', uri);
        res.json(result);
        return;
    }).catch(function (err) {
        console.log('Error creating new student record');
        console.log(err)
        result['data'] = {};
        result['endpoint'] = "/questions";
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
        "endpoint" : "/questions"
    };
    result['responseCode'] = HttpStatus.NOT_IMPLEMENTED;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
    return;
});

// required to make routes work
module.exports = router;