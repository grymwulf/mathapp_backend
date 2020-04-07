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


/*-------------------------------------------------------------------------------------------------------------------*/
/*----------------------------Student Methods by Student Attributes--------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------*/

/**
 * @api (get) /students
 * 
 * @apiName Get All Students
 * 
 * @apiGroup Students
 * 
 * @apiSuccess (JSON) data Current list of all known students
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/', function(req,res) {
    var result = {};
    data.Student.findAll({
        raw: true
    })
    .then(function (students) {
        result['student'] = students;
        result['endpoint'] = "/students";
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function(err){
        console.log('Error querying all students');
        console.log(err)
        result['teacher'] = {};
        result['endpoint'] = "/students";
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});


/**
 * @api (get) /students/lastName/:lastName/level/:level
 * 
 * @apiName GetStudentsByLastName&Level
 * 
 * @apiGroup Students
 * 
 * @apiParam (Number) input student level and last name to pull
 * 
 * @apiSuccess (JSON) data Current students entries by student's last name and level
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */

router.get('/lastName/:lastName/level/:level', function(req,res) {
    var result = {};
    data.Student.findAll({
            where: {
				lastName: req.params.lastName,
				level: req.params.level
            }
    })
    .then( studentData => {
        result['student'] = studentData;
        result['endpoint'] = `students/lastName/:lastName/students/level/:level`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function (err) {
        console.log('Error querying a student by student first and last name');
        console.log(err)
        result['student'] = {};
        result['endpoint'] = `students/lastName/:lastName/students/level/:level`;
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});



/**
 * @api (get) /students/firstName/:firstName/lastName/:lastName
 * 
 * @apiName GetStudentsByFirstandLastName
 * 
 * @apiGroup Students
 * 
 * @apiParam (Number) input student first and last name to pull
 * 
 * @apiSuccess (JSON) data Current students entries by student's full name
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */

router.get('/firstName/:firstName/lastName/:lastName', function(req,res) {
    var result = {};
    data.Student.findAll({
            where: {
				firstName: req.params.firstName,
				lastName: req.params.lastName
            }
    })
    .then( studentData => {
        result['student'] = studentData;
        result['endpoint'] = `students/firstName/:firstName/students/lastName/:lastName`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function (err) {
        console.log('Error querying a student by student first and last name');
        console.log(err)
        result['student'] = {};
        result['endpoint'] = `students/firstName/:firstName/students/lastName/:lastName`;
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
            result['student'] = studentData;
            result['endpoint'] = `/students/firstName/:firstName`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a student');
            console.log(err)
            result['student'] = {};
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
            result['student'] = studentData;
            result['endpoint'] = `/student/lastName/:lastName`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a student by last name');
            console.log(err)
            result['student'] = {};
            result['endpoint'] = `/student/lastName/:lastName`;
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
        result['student'] = studentData;
        result['endpoint'] = `/students/id/:id`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function (err) {
        console.log('Error querying a student by student id');
        console.log(err)
        result['student'] = {};
        result['endpoint'] = `/students/id/:id`;
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
            result['student'] = studentData;
            result['endpoint'] = `/students/stars/:stars`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a student');
            console.log(err)
            result['student'] = {};
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
            result['student'] = studentData;
            result['endpoint'] = `/students/level/:level`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying students by level');
            console.log(err)
            result['student'] = {};
            result['endpoint'] = `/students/level/:level`;
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
            result['student'] = studentData;
            result['endpoint'] = `/students/:id`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a student');
            console.log(err)
            result['student'] = {};
            result['endpoint'] = `/students/:id`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});
/*------------------------------------------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------------------------------------------*/
/*----------------------------Student Methods by Teacher Attributes--------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------*/

/**
 * @api (get) /students/teacher/firstName/:firstName
 * 
 * @apiName Get student by teacher first name
 * 
 * @apiGroup Teachers
 * 
 * @apiSuccess (JSON) Student by teacher first name
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/teacher/firstName/:firstName', (req, res) => {
    var result = {};
    data.Student.findAll({
        include: {
         model: data.Teacher,
         required: true,
         where: {
            firstName: req.params.firstName
        },
        attributes: {
            exclude: ['studentId','teacherId']
        }
    }
})
    .then(function (students) {
        result['students'] = students;
        result['endpoint'] = 'students/teacher/firstName/:firstName';
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function(err){
        console.log('Error querying students by teacher first name');
        console.log(err)
        result['student'] = {};
        result['endpoint'] = 'students/teacher/firstName/:firstName';
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});


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
        result['student'] = studentData;
        result['endpoint'] = `/students/teacherId/:teacherId/students/id/:level `;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function (err) {
        console.log('Error querying a student by teacher ID and specific level');
        console.log(err)
        result['student'] = {};
        result['endpoint'] = `/students/teacherId/:teacherId/students/id/:level `;
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
 * @apiName GetStudentsByteacherId
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
        result['student'] = studentData;
        result['endpoint'] = `/students/teacherId/:teacherId`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function (err) {
        console.log('Error querying a student by teacher ID');
        console.log(err)
        result['student'] = {};
        result['endpoint'] = `/students/teacherId/:teacherId`;
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});


/**
 * @api (get) /students/teacher/lastName/:lastName
 * 
 * @apiName Get student by teacher last name
 * 
 * @apiGroup Teachers
 * 
 * @apiSuccess (JSON) Student by teacher last name
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/teacher/lastName/:lastName', (req, res) => {
    var result = {};
    data.Student.findAll({
        include: {
         model: data.Teacher,
         required: true,
         where: {
            lastName: req.params.lastName
        },
        attributes: {
            exclude: ['studentId','teacherId']
        }
    }
})
    .then(function (students) {
        result['students'] = students;
        result['endpoint'] = 'students/teacher/lastName/:lastName';
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function(err){
        console.log('Error querying students by teacher last name');
        console.log(err)
        result['student'] = {};
        result['endpoint'] = 'students/teacher/lastName/:lastName';
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});

/**
 * @api (get) /students/teacher/firstName/:firstName/lastName/:lastName
 * 
 * @apiName Get student by teacher full name
 * 
 * @apiGroup Students
 * 
 * @apiSuccess (JSON) Student by teacher full name
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/teacher/firstName/:firstName/lastName/:lastName', (req, res) => {
    var result = {};
    data.Student.findAll({
        include: {
         model: data.Teacher,
         required: true,
         where: {
            lastName: req.params.lastName,
			firstName: req.params.firstName
        },
        attributes: {
            exclude: ['studentId','teacherId']
        }
    }
})
    .then(function (students) {
        result['students'] = students;
        result['endpoint'] = 'students/teacher/firstName/:firstName/lastName/:lastName';
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function(err){
        console.log('Error querying students by teacher full name');
        console.log(err)
        result['student'] = {};
        result['endpoint'] = '/teacher/firstName/:firstName/lastName/:lastName';
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
        result['student'] = studentData;
        result['endpoint'] = `/students/teacherId/:teacherId/students/id/:stars `;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function (err) {
        console.log('Error querying a student by teacher ID and specific amount of stars earned');
        console.log(err)
        result['student'] = {};
        result['endpoint'] = `/students/teacherId/:teacherId/students/id/:stars `;
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});

/*----------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------*/
/*----------------------------Student Methods by Test Attributes--------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------*/

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
 * @api (get) /students/id/:id/tests
 * 
 * @apiName Get active tests for a student
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

router.get('/id/:id/tests', (req, res) => {
    var result = {};
    data.Test.findAll({
        include: {
         model: data.Student,
         required: true,
         where: {
            id: req.params.id
        }
    }
})
    .then(function (tests) {
        result['tests'] = tests;
        result['endpoint'] = 'students/id/:id/tests';
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function(err){
        console.log('Error querying students by teacher full name');
        console.log(err)
        result['test'] = {};
        result['endpoint'] = 'students/id/:id/tests';
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});

/*----------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------*/
/*----------------------------Student Patch Methods----------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------*/

/**
 * @api (patch) /students/:id
 * 
 * @apiName Update student name
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
router.patch('/:id', async (req, res) =>{
    var result = {};

    console.log(`Patch: `);
    console.log(req.body);

    try{
    var updatedStudent = await data.Student.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }, {where: {id: req.params.id} });
    
    if (updatedStudent[0] !== 0){
        result['number of student records successfully updated'] = updatedStudent;
            result['endpoint'] = "/students/:id";
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;  
    } else {
        throw new Error('Invalid request')
      }
    } catch (err) {
        console.log('Error updating student information');
        console.log(err)
        result['update unsuccessful'] = {message: 'Invalid Request' };
        result['endpoint'] = "/students";
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    }
});

/*-------------------------------------------------------------------------------------------------------------------*/



/*----------------------------------------------------------------------------------------------------------------*/
/*----------------------------Student Post Methods----------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------*/

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
    var stars = req.body.stars;
    var level = req.body.level;
    var teacherId = req.body.teacherId;


    try{
        var newStudent = await data.Student.create({
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            stars: req.body.stars,
            level: req.body.level,
            teacherId: req.body.teacherId
        });

        console.log(`New student data received: Entry ${newStudent.id} created.`);
        console.log(`Data added was: ${newStudent}.`);

        var uri = req.protocol + '://' + req.get('host') +
        req.baseUrl + req.path + newStudent.id;
        result['new student'] = {
            'id': newStudent.id,   // auto-generated id
            'firstName':firstName,
            'lastName': lastName,
            'stars':stars,
            'level':level,
            'teacherId':teacherId,
            'uri': uri
        };
        result['endpoint'] = "/students";
        result['responseCode'] = HttpStatus.CREATED;
        result['response'] = "New Student Record Created"
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

router.post('/:studentId/tests', async (req, res) => {
    var result = {};
    console.log(`Post: `);
    console.log(req.body);

    try {
        var student = await data.Student.findByPk(req.params.studentId);
        var teacherId = student.teacherId;

        var newTest = await data.Test.create({
            category: req.body.practice,
            attemptsRemaining: req.body.attemptsAllowed,
            baseNumber: req.body.baseNumber,
            operation: req.body.operation,
            teacherId: teacherId,
            studentId: req.params.studentId
        });

        console.log(`New student data received: Entry ${newTest.id} created.`);
        console.log(`Data added was: ${newTest}.`);
        
        var uri = req.protocol + '://' + req.get('host') +
           `/tests/${newTest.id}`;
        result['data'] = {
            'id': newTest.id,
            'uri': uri
        };
        result['endpoint'] = "/students/:studentId/tests";
        result['responseCode'] = HttpStatus.CREATED;
        result['response'] = "Created"
        res.status(result.responseCode);
        res.header('Location', uri);
        res.json(result);
        return;
    } catch (err) {
        console.log('Error creating new student record');
        console.log(err)
        result['data'] = {};
        result['endpoint'] = "/students/:studentId/tests";
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    }

});
/*--------------------------------------------------------------------------------------------------*/

// implementing a basic getter to get all known students in the DB
router.get('/', function (req, res) {
    var result = {};
    data.Student.findAll()
        .then(function (students) {
            result['students'] = students;
            result['endpoint'] = "/students";
            res.status(HttpStatus.OK);
            students.forEach(element => {
                element.data = JSON.parse(element.data)
            });
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying all students');
            console.log(err)
            result['student'] = {};
            result['endpoint'] = "/students";
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
router.use(function (req, res) {
    var result = {};
    result['student'] = {
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