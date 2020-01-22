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
const student = require('../models/student') 


// get a specific teacher
/**
 * @api (get) /teachers/:id
 * 
 * @apiName GetInstructorByID
 * 
 * @apiGroup Instructors
 * 
 * @apiParam (Number) input Instructor ID to pull
 * 
 * @apiSuccess (JSON) data Current table entry for instructor
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/:id', function(req,res) {
    var result = {};
    data.Teacher.findAll({
            where: {
                id: req.params.id
            }
        })
        .then( instructorData => {
            result['data'] = instructorData;
            result['endpoint'] = `/teachers/:id`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a student');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/teachers/:id`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

// get list of all teachers
/**
 * @api (get) /teachers
 * 
 * @apiName Get All Teachers
 * 
 * @apiGroup Teachers
 * 
 * @apiSuccess (JSON) data Current list of all known teachers
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/', function(req,res) {
    var result = {};
    data.Teacher.findAll({
            raw: true
        })
        .then(function (teachers) {
            result['data'] = teachers;
            result['endpoint'] = "/teachers";
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            teachers.forEach(element => {
                element.data = JSON.parse(element.data)
            });            
            res.json(result);
            return;
        }).catch(function(err){
            console.log('Error querying all teachers');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = "/teachers";
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

// get teacher using student id
router.get('/:studentId', (req, res) => {
    var result = {};
    data.Teacher.findAll({
    include: {
            model: student,
            required: true,
            where: {
                studentId: req.params.studentId
            }
        }
    })
        .then(function (teachers) {
            result['data'] = teachers;
            result['endpoint'] = "/teachers/:studentId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            teachers.forEach(element => {
                element.data = JSON.parse(element.data)
            });            
            res.json(result);
            return;
        }).catch(function(err){
            console.log('Error querying all teachers');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = "/teachers";
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
    data.Teacher.create({
        "data": JSON.stringify(req.body)
    }).then(newTeacher => {
        console.log(`New teachers data received: Entry ${newTeacher.id} created.`);
        console.log(`Data added was: ${newTeacher.data}.`);
        var uri = req.protocol + '://' + req.get('host') +
            req.baseUrl + req.path + newTeacher.id;
        result['data'] = {
            'id': newTeacher.id,
            'uri': uri
        };
        result['endpoint'] = "/teachers";
        result['responseCode'] = HttpStatus.CREATED;
        result['response'] = "Created"
        res.status(result.responseCode);
        res.header('Location', uri);
        res.json(result);
        return;
    }).catch(function (err) {
        console.log('Error creating new instructor record');
        console.log(err)
        result['data'] = {};
        result['endpoint'] = "/teachers";
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
        "endpoint" : "/teachers"
    };
    result['responseCode'] = HttpStatus.NOT_IMPLEMENTED;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
    return;
});


// required to make routes work
module.exports = router;