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
const Sequelize = require('sequelize');

// basic getter to get record by primary key
router.get('/:id', function(req,res, next) {
    var result = {};
    data.Result.findAll({
        where: {
            id: req.params.id
        },
        include: {
            model: data.Answer,
            required: true,
            where: {
                resultId: req.params.id
            }
        }
    })
        .then((resultData) => {
            result['data'] = resultData;
            result['endpoint'] = `/results/:id`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
        }).catch(function (err) {
            console.log('Error querying a result by id');
            console.log(err);
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
        where: {
            testId: req.params.testId
        },
        include: {
            model: data.Answer,
            required: true,
            where: {
                resultId: Sequelize.col('result.id')
            }
        }
    })
        .then((resultData) => {
            result['data'] = resultData;
            result['endpoint'] = `results/test/:testId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch((err) => {
            console.log('Error querying results by test');
            console.log(err);
            result['data'] = {};
            result['endpoint'] = `/results/test/:testId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

router.get('/student/:studentId', (req, res) => {
    var result = {};
    data.Result.findAll({
        include: {
            model: data.Test,
            required: true,
            where: {
                studentId: req.params.studentId
            },
            model: data.Answer,
            required: true,
            where: {
                resultId: Sequelize.col('result.id')
            }
        }
    })
        .then((resultData) => {
            result['data'] = resultData;
            result['endpoint'] = `results/student/:studentId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch((err) => {
            console.log('Error querying results by student');
            console.log(err);
            result['data'] = {};
            result['endpoint'] = `/results/student/:studentId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

router.get('/teacher/:teacherId', (req, res) => {
    var result = {};
    data.Result.findAll({
        include: {
            model: data.Test,
            required: true,
            where: {
                teacherId: req.params.teacherId
            },
            model: data.Answer,
            required: true,
            where: {
                resultId: Sequelize.col('result.id')
            }
        }
    })
        .then((resultData) => {
            result['data'] = resultData;
            result['endpoint'] = `results/teacher/:teacherId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch((err) => {
            console.log('Error querying results by teacher');
            console.log(err);
            result['data'] = {};
            result['endpoint'] = `/results/teacher/:teacherId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

// get all results
router.get('/', function (req, res) {
    var result = {};

    data.Result.findAll({
        include: {
            model: data.Answer,
            required: true,
            where: {
                resultId: Sequelize.col('result.id')
            }
        }
    })
        .then(function (results) {
            result['data'] = results;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
        })
        .catch(function (err) {
            console.log('Error querying all results');
            console.log(err);
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

    try {
        var newResult = await data.Result.create({
            time_taken: req.body.time_taken,
            attempt_number: req.body.attempt_number,
            testId: req.body.testId
        });

        console.log(`New result data received: Entry ${newResult.id} created.`);
        console.log(`Result added was: ${JSON.stringify(newResult)}.`);
        console.log(`There are ${Object.keys(req.body.answers).length} answers.`);

        for (i = 0; i < Object.keys(req.body.answers).length; i++) {
            var answerData = req.body.answers[i]
            var newAnswer = await data.Answer.create({
                student_answer: answerData.student_answer,
                operation: answerData.operation,
                operand1: answerData.operand1,
                operand2: answerData.operand2,
                correctly_answered: JSON.stringify(answerData.student_answer
                    == eval(answerData.operand1 + answerData.operation
                        + answerData.operand2)),
                resultId: newResult.id
            });
            console.log(`New answer added to result ${newResult.id}: ` +
                `Answer ${newAnswer.id} created`);
        }
        var uri = req.protocol + '://' + req.get('host') +
            req.baseUrl + req.path + newResult.id;
        result['data'] = {
            'id': newResult.id,
            'uri': uri
        };
        result['endpoint'] = "/results";
        result['responseCode'] = HttpStatus.CREATED;
        result['response'] = "Created"
        res.status(result.responseCode);
        res.header('Location', uri);
        res.json(result);
    }).catch(function (err) {
        console.log('Error creating new result record');
        console.log(err)
        console.log('Error creating new result record');
        console.log(err);
        result['data'] = {};
        result['endpoint'] = "/results";
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
        "endpoint": "/results"
    };
    result['responseCode'] = HttpStatus.NOT_IMPLEMENTED;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
});

// required to make routes work
module.exports = router;