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

/**
 * @api (post) /teachers/
 * 
 * @apiName Post New Teacher
 * 
 * @apiGroup Teachers
 * 
 * @apiSuccess (JSON) Teacher 
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
 router.post('/', async (req, res) =>{
    var result = {};
    console.log(`Post: `);
    console.log(req.body);
    
    //retrieves firstName and lastName from json input
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;


    try{
        var newTeacher = await data.Teacher.create({
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });

        console.log(`New teachers data received: Entry ${newTeacher.id} created.`);
        console.log(`Data added was: ${newTeacher}.`);

        var uri = req.protocol + '://' + req.get('host') +
        req.baseUrl + req.path + newTeacher.id;
        result['new teacher'] = {
            'id': newTeacher.id,   // auto-generated id
            'firstName':firstName,
            'lastName': lastName,
            'uri': uri
        };
        result['endpoint'] = "/teachers";
        result['responseCode'] = HttpStatus.CREATED;
        result['response'] = "Created"
        res.status(result.responseCode);
        res.header('Location', uri);
        res.json(result);
        return;
    }catch (err) {
        console.log('Error creating new teacher record');
        console.log(err)
        result['new teacher'] = {};
        result['endpoint'] = "/teachers";
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    }
});

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
        result['teacher'] = teachers;
        result['endpoint'] = "/teachers";
        result['responseCode'] = HttpStatus.OK;
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function(err){
        console.log('Error querying all teachers');
        console.log(err)
        result['teacher'] = {};
        result['endpoint'] = "/teachers";
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});

/**
 * @api (get) /teachers/:id
 * 
 * @apiName GetTeacherByID
 * 
 * @apiGroup Teachers
 * 
 * @apiParam (Number) input teacher ID to pull
 * 
 * @apiSuccess (JSON) data Current table entry for teacher
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
    .then( teacherData => {
        result['teacher'] = teacherData;
        result['endpoint'] = `/teachers/:id`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function (err) {
        console.log('Error querying of teacher by id');
        console.log(err)
        result['teacher'] = {};
        result['endpoint'] = `/teachers/:id`;
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});

 /**
 * @api (get) /teachers/firstName/:firstName
 * 
 * @apiName GetTeachersByFirstName
 * 
 * @apiGroup Teachers
 * 
 * @apiParam (String) input Teachers First Name to pull
 * 
 * @apiSuccess (JSON) data Current table entry for instructor
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
 router.get('/firstName/:firstName', function(req,res) {
    var result = {};
    data.Teacher.findAll({
        where: {
            firstName: req.params.firstName
        }
    })
    .then( teacherData => {
        result['teacher'] = teacherData;
        result['endpoint'] = `/teachers/firstName/:firstName`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function (err) {
        console.log('Error querying a teacher by their first name');
        console.log(err)
        result['teacher'] = {};
        result['endpoint'] = `/teachers/firstName/:firstName`;
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});

/**
 * @api (get) /teachers/lastName/:lastName
 * 
 * @apiName GetTeachersByLastName
 * 
 * @apiGroup Teachers
 * 
 * @apiParam (String) input Teachers Last Name to pull
 * 
 * @apiSuccess (JSON) data Current table entry for instructor
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
 router.get('/lastName/:lastName', function(req, res) {
    var result = {};
    data.Teacher.findAll({
        where: {
            lastName: req.params.lastName
        }
    })
    .then( teacherData => {
        result['teacher'] = teacherData;
        result['endpoint'] = `/teachers/lastName/:lastName`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function (err) {
        console.log('Error querying a teacher by their last name');
        console.log(err)
        result['teacher'] = {};
        result['endpoint'] = `/teachers/lastName/:lastName`;
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});

////////////////////////////
//   TEST SECTION         //
//                        //
////////////////////////////

/**
 * @api (get) /teachers/test/id/id
 * 
 * @apiName Get teachers by test id
 * 
 * @apiGroup Teachers
 * 
 * @apiSuccess (JSON) Teacher whom the test belongs to
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
 router.get('/test/id/:id', (req, res) => {
    var result = {};
    data.Teacher.findAll({
        include: {
         model: data.Test,
         required: true,
         where: {
            id: req.params.id
        },
        attributes: {
            exclude: ['teacherId', 'studentId']
        }
    }
})
    .then(function (teachers) {
        result['teachers'] = teachers;
        result['endpoint'] = '/teachers/test/id/:id';
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function(err){
        console.log('Error querying teacher by test id');
        console.log(err)
        result['teacher'] = {};
        result['endpoint'] = '/teachers/test/id/:id';
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});


/**
 * @api (get) /teachers/test/level/:level
 * 
 * @apiName Get teachers by test level
 * 
 * @apiGroup Teachers
 * 
 * @apiSuccess (JSON) Teacher whom the test level belongs to
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
 router.get('/test/level/:level', (req, res) => {
    var result = {};
    data.Teacher.findAll({
        include: {
         model: data.Test,
         required: true,
         where: {
            level: req.params.level
        },
        attributes: {
            exclude: ['teacherId', 'studentId']
        }
    }
})
    .then(function (teachers) {
        result['teachers'] = teachers;
        result['endpoint'] = '/teachers/test/level/:level';
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function(err){
        console.log('Error querying teacher by test id');
        console.log(err)
        result['teacher'] = {};
        result['endpoint'] = '/teachers/test/level/:level';
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});

////////////////////////////
//   STUDENT SECTION      //
//                        //
////////////////////////////

 /**
 * @api (get) /teachers/student/id/:id
 * 
 * @apiName Get teachers by student id
 * 
 * @apiGroup Teachers
 * 
 * @apiSuccess (JSON) Teacher whom student id belongs to
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
 router.get('/student/id/:id', (req, res) => {
    var result = {};
    data.Teacher.findAll({
        include: {
           model: data.Student,
           required: true,
           where: {
            id: req.params.id
        },
        attributes: {
            exclude: ['teacherId', 'studentId']
        }
    }
})
    .then(function (teachers) {
        result['teachers'] = teachers;
        result['endpoint'] = '/teachers/student/id/:id';
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function(err){
        console.log('Error querying teacher by student id');
        console.log(err)
        result['teacher'] = {};
        result['endpoint'] = '/teachers/student/id/:id';
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
    })
});

////////////////////////////
//  DEFAULT SECTION      //
//                        //
////////////////////////////

// default handler
// anything not implemented gets a response not implemented
// this HAS to be last in file to ensure it doesn't trigger on anything else that might match
router.use(function(req, res, next) {
    var result = {};
    result['data'] = {
        "endpoint" : "/teachers"
    };
    result['responseCode'] = HttpStatus.NOT_IMPLEMENTED;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
});


// required to make routes work
module.exports = router;