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
 * @api (get) /tests/:id
 * 
 * @apiName GetTestsById
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch ID to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */

router.get('/:id', function (req, res) {

    var result = {};
    data.Test.findAll({
        where: {
            id: req.params.id
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `/tests/:id`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
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

/**
 * @api (get) /tests/id/:id/category/:category
 * 
 * @apiName GetTestsById&Category
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch ID & Category to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/id/:id/category/:category', function(req,res) {
    var result = {};
    var value = req.params.category;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    data.Test.findAll({
            where: {
                id: req.params.id,
	            category: value
            }
        })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `/tests/id/:id/category/:category`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/id/:id/category/:category`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/id/:id/attemptsRemaining/:attemptsRemaining
 * 
 * @apiName GetTestsById&attemptsRemaining
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch ID & attemptsRemaining to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/id/:id/attemptsRemaining/:attemptsRemaining', function(req,res) {
    var result = {};
    data.Test.findAll({
            where: {
                id: req.params.id,
	            attemptsRemaining:req.params.attemptsRemaining
            }
        })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `/tests/id/:id/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/id/:id/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/id/:id/level/:level
 * 
 * @apiName GetTestsById&Level
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch ID & Level to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/id/:id/level/:level', function(req,res) {
    var result = {};
    var paramLevel = req.params.level.split('');
    data.Test.findAll({
            where: {
                id: req.params.id,
	            baseNumber: paramLevel[0],
	    	    operation: paramLevel[1]
            }
        })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `/tests/id/:id/level/:level`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/id/:id/level/:level`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/id/:id/teachers/:teacherId
 * 
 * @apiName GetTestsById&teacherId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch ID & teacherId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/id/:id/teachers/:teacherId', function(req,res) {
    var result = {};
    data.Test.findAll({
            where: {
                id: req.params.id,
	            teacherId:req.params.teacherId
            }
        })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `/tests/id/:id/teachers/:teacherId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/id/:id/teachers/:teacherId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/id/:id/students/:studentId
 * 
 * @apiName GetTestsById&studentId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch ID & studentId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/id/:id/students/:studentId', function(req,res) {
    var result = {};
    data.Test.findAll({
            where: {
                id: req.params.id,
	        studentId:req.params.studentId
            }
        })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `/tests/id/:id/students/:studentId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/id/:id/students/:studentId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/id/:id/teachers/:teacherId/students/:studentId
 * 
 * @apiName GetTestsById&teacherId&studentId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch ID & teacherId & studentId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/id/:id/teachers/:teacherId/students/:studentId', function(req,res) {
    var result = {};
    data.Test.findAll({
            where: {
                id: req.params.id,
	        teacherId:req.params.teacherId,
	        studentId:req.params.studentId
            }
        })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `/tests/id/:id/teachers/:teacherId/students/:studentId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/id/:id/teachers/:teacherId/students/:studentId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/category/:category
 * 
 * @apiName GetTestsByCategory
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch Category to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */

router.get('/category/:category', function (req, res) {
    var result = {};
    var value = req.params.category;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    data.Test.findAll({
        where: {
            category: value
        },
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `/tests/category/:category`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
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

/**
 * @api (get) /tests/category/:category/level/:level
 * 
 * @apiName GetTestsByCategory&Level
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch Category & Level to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/category/:category/level/:level', function(req,res) {
    var result = {};
    var value = req.params.category;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    var paramLevel = req.params.level.split('');
    data.Test.findAll({
            where: {
                category: value,
		        baseNumber: paramLevel[0],
	    	    operation: paramLevel[1]
            },
        })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `/tests/category/:category/level/:level`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/category/:category/level/:level`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/category/:category/teachers/:teacherId/students/:studentId
 * 
 * @apiName GetTestsByCategory&teacherId&studentId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch Category & TeacherId & StudentId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/category/:category/teachers/:teacherId/students/:studentId', function(req,res) {
    var result = {};
    var value = req.params.category;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    data.Test.findAll({
            where: {
                category: value,
		teacherId: req.params.teacherId,
		studentId: req.params.studentId
            },
        })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `/tests/category/:category/teachers/:teacherId/students/:studentId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/category/:category/teachers/teacherId/students/:studentId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/level/:level
 * 
 * @apiName GetTestsByLevel
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch Level to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */

router.get('/level/:level', function (req, res) {
    var result = {};
    var paramLevel = req.params.level.split('');
    data.Test.findAll({
        where: {
            baseNumber: paramLevel[0],
	        operation: paramLevel[1]
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `/tests/level/:level`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/level/:level`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })

});

/**
 * @api (get) /tests/level/:level/students/studentId
 * 
 * @apiName GetTestsByLevel&StudentId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch Level & StudentId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */

router.get('/level/:level/students/:studentId', function (req, res) {
    var result = {};
    var paramLevel = req.params.level.split('');
    data.Test.findAll({
        where: {
            baseNumber: paramLevel[0],
	        operation: paramLevel[1],
            studentId: req.params.studentId
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `/tests/level/:level/students/:studentId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/level/:level/students/:studentId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })

});


/**
 * @api (get) /tests/level/:level/attemptsRemaining/:attemptsRemaining/students/studentId
 * 
 * @apiName GetTestsByLevel&AttemptsRemaining&StudentId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch Level AttemptsRemaining StudentId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */

router.get('/level/:level/attemptsRemaining/:attemptsRemaining/students/:studentId', function (req, res) {
    var result = {};
    var paramLevel = req.params.level.split('');
    data.Test.findAll({
        where: {
            baseNumber: paramLevel[0],
	        operation: paramLevel[1],
            attemptsRemaining: req.params.attemptsRemaining,
            studentId: req.params.studentId
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `tests/level/:level/attemptsRemaining/:attemptsRemaining/students/:studentId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/level/:level/attemptsRemaining/:attemptsRemaining/students/:studentId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })

});

/**
 * @api (get) /tests/attemptsRemaining/:attemptsRemaining
 * 
 * @apiName GetTestsByAttemptsRemaining
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch AttemptsRemaining to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/attemptsRemaining/:attemptsRemaining', function(req,res) {
    var result = {};
    data.Test.findAll({
            where: {
                attemptsRemaining: req.params.attemptsRemaining
            }
        })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `/tests/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })

});

/**
 * @api (get) /tests/teachers/:teacherId
 * 
 * @apiName GetTestsByteacherId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch teacherId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */

router.get('/teachers/:teacherId', function (req, res) {
    var result = {};
    data.Test.findAll({
        where: {
            teacherId: req.params.teacherId
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `/tests/teachers/:teacherId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/teachers/:teacherId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })

});

/**
 * @api (get) /tests/students/:studentId
 * 
 * @apiName GetTestsBystudentId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch studentId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/students/:studentId', function (req, res) {
    var result = {};
    data.Test.findAll({
        where: {
            studentId: req.params.studentId
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `/tests/students/:studentId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/students/:studentId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/students/:studentId/level/:level/attemptsRemaining/:attemptsRemaining
 * 
 * @apiName GetTestsBystudentId&level&attemptsRemaining
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch studentId level attemptsRemaining to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/students/:studentId/level/:level/attemptsRemaining/:attemptsRemaining', function (req, res) {
    var result = {};
    var paramLevel = req.params.level.split('');
    data.Test.findAll({
        where: {
            studentId: req.params.studentId,
            baseNumber: paramLevel[0],
	        operation: paramLevel[1],
            attemptsRemaining: req.params.attemptsRemaining
        }
    })
        .then(testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `/tests/students/:studentId/level/:level/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/students/:studentId/level/:level/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/students/:studentId/attemptsRemaining/:attemptsRemaining
 * 
 * @apiName GetTestsBystudentId&attemptsRemaining
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch studentId & attemptsRemaining to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/students/:studentId/attemptsRemaining/:attemptsRemaining', function(req,res) {
    var result = {};
    data.Test.findAll({
            where: {
                studentId: req.params.studentId,
		        attemptsRemaining: req.params.attemptsRemaining
            }
        })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `/tests/students/:studentId/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/students/:studentId/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/teachers/:teacherId/students/:studentId
 * 
 * @apiName GetTestsByteacherId&studentId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch teacherId & studentId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/teachers/:teacherId/students/:studentId', function (req, res) {
    var result = {};
    data.Test.findAll({
            where: {
		        teacherId: req.params.teacherId,
                studentId: req.params.studentId
            }
        })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `/tests/teachers/:teacherId/students/:studentId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/teachers/:teacherId/students/:studentId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/category/:category/attemptsRemaining/:attemptsRemaining
 * 
 * @apiName GetTestsBycategory&attemptsRemaining
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch category & attemptsRemaining to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/category/:category/attemptsRemaining/:attemptsRemaining', function(req,res) {
    var result = {};
    var value = req.params.category;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    data.Test.findAll({
            where: {
		        category: value,
                attemptsRemaining: req.params.attemptsRemaining
            }
        })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `/tests/category/:category/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/category/:category/attemptsRemaining/:attemptsRemaining`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/category/:category/teachers/:teacherId
 * 
 * @apiName GetTestsBycategory&teacherId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch category & teacherId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/category/:category/teachers/:teacherId', function(req,res) {
    var result = {};
    var value = req.params.category;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    data.Test.findAll({
            where: {
		        category: value,
                teacherId: req.params.teacherId
            }
        })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `/tests/category/:category/teachers/:teacherId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/category/:category/teachers/:teacherId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (get) /tests/category/:category/students/:studentId
 * 
 * @apiName GetTestsBycategory&studentId
 * 
 * @apiGroup Tests
 * 
 * @apiParam (Number) input Test batch category & studentId to pull
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/category/:category/students/:studentId', function(req,res) {
    var result = {};
    var value = req.params.category;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    data.Test.findAll({
            where: {
		        category: value,
                studentId: req.params.studentId
            }
        })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = `/tests/category/:category/students/:studentId`;
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function (err) {
            console.log('Error querying a test');
            console.log(err)
            result['data'] = {};
            result['endpoint'] = `/tests/category/:category/students/:studentId`;
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});

/**
 * @api (post) /tests/
 * 
 * @apiName PostTests
 * 
 * @apiGroup Tests
 * 
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.post('/', async (req, res) =>{
	var result = {};
	console.log(`Post: `);
	console.log(req.body);
	
	var category = req.body.category;
	var baseNumber = req.body.baseNumber;
	var operation = req.body.operation;
	var attemptsRemaining = req.body.attemptsRemaining;
	var teacherId = req.body.teacherId;
	var studentId = req.body.studentId;
	
	try{
	    var newTest = await data.Test.create({
		id: req.body.id,
		category: req.body.category,
		baseNumber: req.body.baseNumber,
		operation: req.body.operation,
		attemptsRemaining: req.body.attemptsRemaining,
		teacherId: req.body.teacherId,
		studentId: req.body.studentId
	});

	console.log(`New tests data received: Entry ${newTest.id} created.`);

	var uri = req.protocol + '://' + req.get('host') +
	req.baseUrl + req.path + newTest.id;
	result['new test'] = {
		'id': newTest.id,
		'category': category,
		'baseNumber': baseNumber,
		'operation':operation,
		'attemptsRemaining': attemptsRemaining,
		'teacherId': teacherId,
		'studentId': studentId,
		'uri': uri
	};
	result['endpoint'] = "/tests";
	result['responseCode'] = HttpStatus.CREATED;
	result['response'] = "Created"
	res.status(result.responseCode);
	res.header('Location', uri);
	res.json(result);
	return;
     }catch(err) {
	console.log('Error creating new test record');
	console.log(err)
	result['data'] = {};
	result['endpoint'] = "/tests";
	result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
	result['response'] = "Internal Server Error";
	res.status(result.responseCode);
	res.json(result);
	return;
     }
});

/**
 * @api (get) /tests/
 * 
 * @apiName GetTests
 * 
 * @apiGroup Tests
 * 
 * 
 * @apiSuccess (JSON) data Current table entry for test
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set test on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/', function (req, res) {
    var result = {};
    data.Test.findAll({
        model: data.Test
    })
        .then( testData => {
            var parsed = JSON.parse(JSON.stringify(testData));
            for(i = 0; i < parsed.length; i++) {
                delete parsed[i].operation;
                delete parsed[i].baseNumber;
            }
            result['data'] = parsed;
            result['endpoint'] = "/tests";
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            res.status(result.responseCode);
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

// default handler
// anything not implemented gets a response not implemented
// this HAS to be last in file to ensure it doesn't trigger on anything else that might match
router.use(function (req, res) {
    var result = {};
    result['data'] = {
        "endpoint": "/tests"
    };
    result['responseCode'] = HttpStatus.NOT_IMPLEMENTED;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
    return;
});

// required to make routes work
module.exports = router;