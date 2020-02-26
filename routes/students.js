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

/**
 * @api (get) /students/teacherId/:teacherId/students/id/:level
 * 
 * @apiName GetStudentsByTeacherID&Level
 * 
 * @apiGroup Students
 * 
 * @apiParam (Number) input teacher ID and level to pull
 * 
 * @apiSuccess (JSON) data Current students entries by teacher
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */

router.get('/teacherId/:teacherId/level/:level', function(req,res) {
    var result = {};
    data.Student.findAll({
            where: {
                teacherId: req.params.teacherId,
				level: req.params.level
            }
    })
    .then( studentData => {
        result['data'] = studentData;
        result['endpoint'] = `/students/teacherId/:teacherId/students/id/:level `;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function (err) {
        console.log('Error querying a student by teacher ID and specific level');
        console.log(err)
        result['data'] = {};
        result['endpoint'] = `/students/teacherId/:teacherId/students/id/:level `;
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});


// basic getter to get record by primary key
router.get('/:id', function(req, res) {
    var result = {};
    data.Student.findAll({
            where: {
                id: req.params.id
            }
        })
        .then( studentData => {
            result['data'] = studentData;
            result['endpoint'] = `/students/:id`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a student');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/students/:id`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /students/firstName/:firstName
 * 
 * @apiName GetStudentsByFirstName
 * 
 * @apiGroup Students
 * 
 * @apiParam (String) input first name to pull
 * 
 * @apiSuccess (JSON) data Current students entries by first name
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */

// getter to get record(s) by student first name
router.get('/firstName/:firstName', function(req, res) {
    var result = {};
    data.Student.findAll({
            where: {
                firstName: req.params.firstName
            }
        })
        .then( studentData => {
            result['data'] = studentData;
            result['endpoint'] = `/students/firstName/:firstName`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a student');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/students/firstName/:firstName`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});


/**
 * @api (get) /students/lastName/:lastName
 * 
 * @apiName GetStudentsByLastName
 * 
 * @apiGroup Students
 * 
 * @apiParam (String) input last name to pull
 * 
 * @apiSuccess (JSON) data Current students entries by last name
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */

// getter to get record(s) by student last name
router.get('/lastName/:lastName', function(req,res) {
    var result = {};
    data.Student.findAll({
            where: {
                lastName: req.params.lastName
            }
        })
        .then( studentData => {
            result['data'] = studentData;
            result['endpoint'] = `/student/lastName/:lastName`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a teacher');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/student/lastName/:lastName`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /students/stars/:stars
 * 
 * @apiName GetStudentsByStars
 * 
 * @apiGroup Students
 * 
 * @apiParam (Number) input number of stars to pull
 * 
 * @apiSuccess (JSON) data Current students entries by stars
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */

// getter to get record(s) of student by number of stars
router.get('/stars/:stars', function(req, res) {
    var result = {};
    data.Student.findAll({
            where: {
                stars: req.params.stars
            }
        })
        .then( studentData => {
            result['data'] = studentData;
            result['endpoint'] = `/students/stars/:stars`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a student');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/students/stars/:stars`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

// basic getter to get student record(s) by level
router.get('/level/:level', function(req, res) {
    var result = {};
    data.Student.findAll({
            where: {
                level: req.params.level
            }
        })
        .then( studentData => {
            result['data'] = studentData;
            result['endpoint'] = `/students/level/:level`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying students by level');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/students/level/:level`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});



/**
 * @api (get) /students/teacher/:teacherId
 * 
 * @apiName GetStudentsByTeacherID
 * 
 * @apiGroup Students
 * 
 * @apiParam (Number) input teacher ID to pull
 * 
 * @apiSuccess (JSON) data Current students entries by teacher
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */

router.get('/teacherId/:teacherId', function(req,res) {
    var result = {};
    data.Student.findAll({
            where: {
                teacherId: req.params.teacherId
            }
    })
    .then( studentData => {
        result['data'] = studentData;
        result['endpoint'] = `/students/teacherId/:teacherId`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function (err) {
        console.log('Error querying a student by teacher ID');
        console.log(err)
        result['data'] = {};
        result['endpoint'] = `/students/teacherId/:teacherId`;
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});

/**
 * @api (get) /students/id/:id
 * 
 * @apiName GetStudentsByStudentID
 * 
 * @apiGroup Students
 * 
 * @apiParam (Number) input student ID to pull
 * 
 * @apiSuccess (JSON) data Current student entries by id
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */

router.get('/id/:id', function(req,res) {
    var result = {};
    data.Student.findAll({
            where: {
                id: req.params.id
            }
    })
    .then( studentData => {
        result['data'] = studentData;
        result['endpoint'] = `/students/id/:id`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function (err) {
        console.log('Error querying a student by student id');
        console.log(err)
        result['data'] = {};
        result['endpoint'] = `/students/id/:id`;
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});

/**
 * @api (get) /students/test/id/id
 * 
 * @apiName Get students by test id
 * 
 * @apiGroup Students
 * 
 * @apiSuccess (JSON) Student whom the test belongs to
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/test/id/:id', (req, res) => {
    var result = {};
    data.Student.findAll({
        include: {
         model: data.Test,
         required: true,
         where: {
            id: req.params.id
        },
        attributes: {
            exclude: ['studentId', 'teacherId']
        }
    }
})
    .then(function (students) {
        result['students'] = students;
        result['endpoint'] = '/students/test/id/:id';
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function(err){
        console.log('Error querying student by test id');
        console.log(err)
        result['student'] = {};
        result['endpoint'] = '/students/test/id/:id';
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});

/**
 * @api (get) /students/teacherId/:teacherId/students/id/:stars
 * 
 * @apiName GetStudentsByTeacherID&Stars
 * 
 * @apiGroup Students
 * 
 * @apiParam (Number) input teacher ID and stars to pull
 * 
 * @apiSuccess (JSON) data Current students entries by teacher and stars earned
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */

router.get('/teacherId/:teacherId/stars/:stars', function(req,res) {
    var result = {};
    data.Student.findAll({
            where: {
                teacherId: req.params.teacherId,
				stars: req.params.stars
            }
    })
    .then( studentData => {
        result['data'] = studentData;
        result['endpoint'] = `/students/teacherId/:teacherId/students/id/:stars `;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function (err) {
        console.log('Error querying a student by teacher ID and specific amount of stars earned');
        console.log(err)
        result['data'] = {};
        result['endpoint'] = `/students/teacherId/:teacherId/students/id/:stars `;
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});

// implementing a basic getter to get all known students in the DB
router.get('/', function (req, res) {
    var result = {};
    data.Student.findAll()
        .then(function (students) {
            result['students'] =students;
            res.status(HttpStatus.OK);
            students.forEach(element => {
                element.data = JSON.parse(element.data)
            });
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying all students');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = "/students";
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
})

/**
 * @api (post) /students/
 * 
 * @apiName Post new student
 * 
 * @apiGroup Students
 * 
 * @apiSuccess (JSON) Students 
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
    
    //retrieves firstName and lastName from input json 
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    //var stars = req.body.stars
    //var level = req.body.level


    try{
        var newStudent = await data.Student.create({
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName
            //stars: req.body.stars,
            //level: req.body.level,
            //teacherId: req.body.teacherId
        });

        console.log(`New student data received: Entry ${newStudent.id} created.`);
        console.log(`Data added was: ${newStudent}.`);

        var uri = req.protocol + '://' + req.get('host') +
        req.baseUrl + req.path + newStudent.id;
        result['new student'] = {
            'id': newStudent.id,   // auto-generated id
            'firstName':firstName,
            'lastName': lastName,
            'uri': uri
        };
        result['endpoint'] = "/students";
        result['responseCode'] = HttpStatus.CREATED;
        result['response'] = "Created"
        res.status(result.responseCode);
        res.header('Location', uri);
        res.json(result);
        return;
    }catch (err) {
        console.log('Error creating new student record');
        console.log(err)
        result['new student'] = {};
        result['endpoint'] = "/students";
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    }
});


// default handler
// anything not implemented gets a response not implemented
// this HAS to be last in file to ensure it doesn't trigger on anything else that might match
router.use(function (req, res) {
    var result = {};
    result['data'] = {
        "endpoint": "/students"
    };
    result['responseCode'] = HttpStatus.NOT_IMPLEMENTED;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
    return;
});

// required to make routes work
module.exports = router;