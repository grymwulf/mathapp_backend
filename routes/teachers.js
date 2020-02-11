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
        },
        attributes: {
            exclude: ['data']
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
        },
        attributes: {
            exclude: ['data']
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
        },
        attributes: {
            exclude: ['data']
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
        result['teacher'] = teachers;
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
        result['teacher'] = {};
        result['endpoint'] = "/teachers";
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});

// Test Model endpoints 

/**
 * @api (get) /teachers/tests/type
 * 
 * @apiName Get teachers by test type
 * 
 * @apiGroup Teachers
 * 
 * @apiSuccess (JSON) Teacher whom the test type belongs to
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
 router.get('/test/:type', (req, res) => {
    var result = {};
    data.Teacher.findAll({
        include: {
         model: data.Test,
         required: true,
         where: {
            type: req.params.type
        }
    }
})
    .then(function (teachers) {
        result['teacher'] = teachers;
        result['endpoint'] = '/teacher/test/:type';
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
        result['teacher'] = {};
        result['endpoint'] = '/teacher/test/:type';
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});


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
      attributes: {
        exclude: ['data']
    },
    include: {
     model: data.Test,
     required: true,
     where: {
        id: req.params.id
    },
    attributes: {
        exclude: ['teacherId', 'data', 'studentId']
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
        console.log('Error querying all teachers');
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
      attributes: {
        exclude: ['data']
    },
    include: {
     model: data.Test,
     required: true,
     where: {
        level: req.params.level
    },
    attributes: {
        exclude: ['teacherId', 'data', 'studentId']
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
        console.log('Error querying all teachers');
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

/**
 * @api (get) /teachers/students/studentid
 * 
 * @apiName Get students teacher
 * 
 * @apiGroup Teachers
 * 
 * @apiSuccess (JSON) Teacher whom the student belongs to
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
 router.get('/student/:studentId', (req, res) => {
    var result = {};
    data.Teacher.findAll({
        include: {
            where: {
                studentId: req.params.studentId
            }
        }
    })
    .then(function (teachers) {
        result['data'] = teachers;
        result['endpoint'] = '/teacher/student/:studentId';
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
        result['endpoint'] = '/teacher/student/:studentId';
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