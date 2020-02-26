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
/**
 * @api (get) /results/:id
 * 
 * @apiName GetTestResultsByID
 * 
 * @apiGroup Results
 * 
 * @apiParam (Number) input Result batch ID to pull
 * 
 * @apiSuccess (JSON) data Current table entry for result
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/:id', (req, res) => {
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
            },
            attributes: {
                exclude: ['id', 'resultId']
            }
        }
    }).then((resultData) => {
        result['data'] = resultData;
        result['endpoint'] = `/results/:id`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function (err) {
        console.log('Error querying a result by id');
        console.log(err);
        result['data'] = {};
        result['endpoint'] = `/results/:id`;
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});

/**
 * @api (get) /results/:id/summary
 * 
 * @apiName GetSummaryTestResultsByID
 * 
 * @apiGroup Results
 * 
 * @apiParam (Number) input Result batch ID to pull
 * 
 * @apiSuccess (JSON) data Current table entry for result
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/:id/summary', async (req, res) => {
    var result = {};
    try {
        var correctCount = await data.Result.count({
            where: {
                id: req.params.id
            },
            include: {
                model: data.Answer,
                required: true,
                where: {
                    resultId: req.params.id,
                    correctlyAnswered: true
                }
            }
        });
        var resultData = await data.Result.findAll({
            where: {
                id: req.params.id
            },
            include: {
                model: data.Answer,
                required: true,
                where: {
                    resultId: req.params.id
                },
                attributes: []
            },
            attributes: {
                include: [
                    [Sequelize.fn('COUNT', Sequelize.col('resultId')), 'totalQuestions']
                ]
            }
        });
        resultData[0].dataValues.correctlyAnswered = correctCount;
        result['data'] = resultData;
        result['endpoint'] = `results/:id/summary`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    } catch (err) {
        console.log('Error querying results summary');
        console.log(err);
        result['data'] = {};
        result['endpoint'] = `/results/:id/summary`;
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    }
});

// getter to get record(s) by test
/**
 * @api (get) /results/test/:id
 * 
 * @apiName GetResultsBytestId
 * 
 * @apiGroup Results
 * 
 * @apiParam (Number) input Test ID to pull
 * 
 * @apiSuccess (JSON) data Current results table entries for test 
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/test/:testId', (req, res) => {
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
            },
            attributes: {
                exclude: ['id', 'resultId']
            }
        }
    }).then((resultData) => {
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

/**
 * @api (get) /results/test/:id/summary
 * 
 * @apiName GetSummaryResultsBytestId
 * 
 * @apiGroup Results
 * 
 * @apiParam (Number) input Test ID to pull
 * 
 * @apiSuccess (JSON) data Current results table entries for test 
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/test/:testId/summary', async (req, res) => {
    var result = {};

    try {
        var resultData = await data.Result.findAll({
            where: {
                testId: req.params.testId
            },
            include: {
                model: data.Answer,
                required: true,
                where: {
                    resultId: Sequelize.col('result.id')
                },
                attributes: []
            }
        })
        for (i = 0; i < resultData.length; i++) {
            var correctCount = await data.Result.count({
                where: {
                    id: resultData[i].dataValues.id
                },
                include: {
                    model: data.Answer,
                    required: true,
                    where: {
                        resultId: resultData[i].dataValues.id,
                        correctlyAnswered: true
                    }
                }
            });
            var totalCount = await data.Result.count({
                where: {
                    id: resultData[i].dataValues.id
                },
                include: {
                    model: data.Answer,
                    required: true,
                    where: {
                        resultId: resultData[i].dataValues.id
                    }
                }
            });
            resultData[i].dataValues.totalQuestions = totalCount;
            resultData[i].dataValues.correctlyAnswered = correctCount;
        }
        result['data'] = resultData;
        result['endpoint'] = `results/test/:testId/summary`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    } catch (err) {
        console.log('Error querying results by test');
        console.log(err);
        result['data'] = {};
        result['endpoint'] = `/results/test/:testId/summary`;
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    }
});

/**
 * @api (get) /results/student/:id
 * 
 * @apiName GetResultsBystudentId
 * 
 * @apiGroup Results
 * 
 * @apiParam (Number) input student ID to pull
 * 
 * @apiSuccess (JSON) data Current results entires for student
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
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
            },
            attributes: {
                exclude: ['id', 'resultId']
            }
        }
    }).then((resultData) => {
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

/**
 * @api (get) /results/student/:id/summary
 * 
 * @apiName GetSummaryResultsBystudentId
 * 
 * @apiGroup Results
 * 
 * @apiParam (Number) input student ID to pull
 * 
 * @apiSuccess (JSON) data Current summary results entires for student
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/student/:studentId/summary', async (req, res) => {
    var result = {};

    try {
        var resultData = await data.Result.findAll({
            include: {
                model: data.Test,
                required: true,
                where: {
                    studentId: req.params.studentId
                },
                attributes: [],
                model: data.Answer,
                required: true,
                where: {
                    resultId: Sequelize.col('result.id')
                },
                attributes: []
            }
        });
        for (i = 0; i < resultData.length; i++) {
            var correctCount = await data.Result.count({
                where: {
                    id: resultData[i].dataValues.id
                },
                include: {
                    model: data.Test,
                    required: true,
                    where: {
                        studentId: req.params.studentId
                    },
                    model: data.Answer,
                    required: true,
                    where: {
                        resultId: resultData[i].dataValues.id,
                        correctlyAnswered: true
                    }
                }
            });
            var totalCount = await data.Result.count({
                where: {
                    id: resultData[i].dataValues.id
                },
                include: {
                    model: data.Test,
                    required: true,
                    where: {
                        studentId: req.params.studentId
                    },
                    model: data.Answer,
                    required: true,
                    where: {
                        resultId: resultData[i].dataValues.id
                    }
                }
            });
            resultData[i].dataValues.totalQuestions = totalCount;
            resultData[i].dataValues.correctlyAnswered = correctCount;
        }
        result['data'] = resultData;
        result['endpoint'] = `results/student/:studentId/summary`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    } catch (err) {
        console.log('Error querying results by student');
        console.log(err);
        result['data'] = {};
        result['endpoint'] = `/results/student/:studentId/summary`;
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    }
});

/**
 * @api (get) /results/teacher/:id
 * 
 * @apiName GetResultsByteacherId
 * 
 * @apiGroup Results
 * 
 * @apiParam (Number) input teacher ID to pull
 * 
 * @apiSuccess (JSON) data Current results entries by teacher
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
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
            },
            attributes: {
                exclude: ['id', 'resultId']
            }
        }
    }).then((resultData) => {
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

/**
 * @api (get) /results/teacher/:id/summary
 * 
 * @apiName GetSummaryResultsByteacherId
 * 
 * @apiGroup Results
 * 
 * @apiParam (Number) input teacher ID to pull
 * 
 * @apiSuccess (JSON) data Current summary results entires for teacher
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/teacher/:teacherId/summary', async (req, res) => {
    var result = {};

    try {
        var resultData = await data.Result.findAll({
            include: {
                model: data.Test,
                required: true,
                where: {
                    studentId: req.params.teacherId
                },
                attributes: [],
                model: data.Answer,
                required: true,
                where: {
                    resultId: Sequelize.col('result.id')
                },
                attributes: []
            }
        });
        for (i = 0; i < resultData.length; i++) {
            var correctCount = await data.Result.count({
                where: {
                    id: resultData[i].dataValues.id
                },
                include: {
                    model: data.Test,
                    required: true,
                    where: {
                        studentId: req.params.teacherId
                    },
                    model: data.Answer,
                    required: true,
                    where: {
                        resultId: resultData[i].dataValues.id,
                        correctlyAnswered: true
                    }
                }
            });
            var totalCount = await data.Result.count({
                where: {
                    id: resultData[i].dataValues.id
                },
                include: {
                    model: data.Test,
                    required: true,
                    where: {
                        studentId: req.params.teacherId
                    },
                    model: data.Answer,
                    required: true,
                    where: {
                        resultId: resultData[i].dataValues.id
                    }
                }
            });
            resultData[i].dataValues.totalQuestions = totalCount;
            resultData[i].dataValues.correctlyAnswered = correctCount;
        }
        result['data'] = resultData;
        result['endpoint'] = `results/teacher/:teacherId/summary`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    } catch (err) {
        console.log('Error querying results by teacher');
        console.log(err);
        result['data'] = {};
        result['endpoint'] = `/results/teacher/:teacherId/summary`;
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    }
});

// get all results
/**
 * @api (get) /results/
 * 
 * @apiName GetTestResults
 * 
 * @apiGroup Results
 * 
 * @apiSuccess (JSON) data All current table entry for result
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/', (req, res) => {
    var result = {};

    data.Result.findAll({
        include: {
            model: data.Answer,
            required: true,
            where: {
                resultId: Sequelize.col('result.id')
            },
            attributes: {
                exclude: ['id', 'resultId']
            }
        }
    }).then(function (results) {
        result['data'] = results;
        result['endpoint'] = `/results/`;
        result['responseCode'] = HttpStatus.OK;
        result['response'] = "Query Successful";
        res.status(result.responseCode);
        res.json(result);
        return;
    }).catch(function (err) {
        console.log('Error querying all results');
        console.log(err);
        result['data'] = {};
        result['endpoint'] = `/results/`;
        result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
        result['response'] = "Internal Server Error";
        res.status(result.responseCode);
        res.json(result);
        return;
    })
});

// post data to endpoint
/**
 * @api (post) /results/
 * 
 * @apiName PostTestResults
 * 
 * @apiGroup Results
 * 
 * @apiSuccess (JSON) data id and uri of new result
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.post('/', async (req, res) => {
    var result = {};
    console.log(`Post: `);
    console.log(req.body);

    try {
        var addResult = await data.sequelize.transaction();
        var newResult = await data.Result.create({
            timeTaken: req.body.timeTaken,
            testId: req.body.testId
        }, {
            transaction: addResult
        });

        console.log(`New result data received: Entry ${newResult.id} created.`);
        console.log(`There are ${Object.keys(req.body.answers).length} answers.`);

        for (i = 0; i < Object.keys(req.body.answers).length; i++) {
            var answerData = req.body.answers[i]
            var newAnswer = await data.Answer.create({
                studentAnswer: answerData.studentAnswer,
                operation: answerData.operation,
                operand1: answerData.operand1,
                operand2: answerData.operand2,
                correctlyAnswered: answerData.studentAnswer
                    == eval(answerData.operand1 + answerData.operation
                        + answerData.operand2),
                resultId: newResult.id
            }, {
                transaction: addResult
            });
            console.log(`New answer added to result ${newResult.id}: ` +
                `Answer ${newAnswer.id} `);
        }

        await data.Test.decrement('attemptsRemaining', {
            where: {
                id: req.body.testId
            },
            transaction: addResult
        });

        await addResult.commit();

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
        return;
    } catch (err) {
        await addResult.rollback();
        console.log(err)
        console.log('Error creating new result record');
        console.log(err);
        result['data'] = {};
        result['endpoint'] = "/results";
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
router.use((req, res) => {
    var result = {};
    result['data'] = {
        "endpoint": "/results"
    };
    result['responseCode'] = HttpStatus.NOT_IMPLEMENTED;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
    return;
});

// required to make routes work
module.exports = router;