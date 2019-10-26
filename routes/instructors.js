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


// get a specific instructor
/**
 * @api (get) /instructors/id/:id
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
router.get('/id/:id', function(req,res) {

    console.log("get instructor by ID");
    console.log(req.params.id);

    if ((typeof(req.params.id) === undefined) || // shouldn't happen, but if id is undefined
        (req.params.id == null) || // id is null, again shouldn't happen
        (req.params.id == "") || // id is empty string
        (parseInt(req.params.id, 10) === NaN)) // id is not a number
        {
            result['data'] = {};
            result['endpoint'] = "/id/:id";
            result['responseCode'] = HttpStatus.BAD_REQUEST;
            result['response'] = "Invalid parameter for request.  ID must be an integer";
            res.status(HttpStatus.BAD_REQUEST);
            res.json(result);
            return;
        }

        // refactored search to separate function for readability
        var id = parseInt(req.params.id, 10)
        getInstructorByID(id)
            .then((result) =>{
                console.log(result);
                res.json(result);
                return;
            })
        // build our response packet
        //res.status(result.responseCode);
});

// get list of all instructors
/**
 * @api (get) /instructors
 * 
 * @apiName Get All Instructors
 * 
 * @apiGroup Instructors
 * 
 * @apiSuccess (JSON) data Current list of all known instructors
 * @apiSuccess (JSON) responseCode HTTP Response Code
 * @apiSuccess (JSON) response Server Response
 * 
 * @apiError (JSON) data Empty data set result on error
 * @apiError (JSON) responseCode HTTP Response Code
 * @apiError (JSON) response Server Response
 */
router.get('/', function(req,res) {
    var result = {};
    data.Instructor.findAll()
        .then(function (instructors) {
            result['data'] = instructors;
            result['endpoint'] = "/";
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Query Successful";
            instructors.forEach(element => {
                console.log(element);
            });
            res.status(result.responseCode);
            res.json(result);
            return;
        }).catch(function(err){
            console.log('Error querying all instructors');
            console.log(err)
            result['data'] = {};
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});


// default handler
// anything not implemented gets a response not implemented
// this HAS to be last in file to ensure it doesn't trigger on anything else that might match
router.use(function(req,res) {
    var result = {};
    result['data'] = {
        "endpoint" : "instructors"
    };
    result['responseCode'] = HttpStatus.NOT_IMPLEMENTED;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
    return;
});


// we move this to a separate function for readability
async function getInstructorByID(id) {
    // result object
    var result = {};

    // execute query
    data.Instructor.findByPk(id)
        .then(function(instructor) {
            if (!instructor) {
                // not found, send proper response
                result['responseCode'] = HttpStatus.NO_CONTENT;
                result['response'] = `ID: ${id} does not match a known instructor.`
                result['data'] = {};
                return result;
            }

            // it was found, build response
            result['data'] = {
                "instructor": instructor.toJSON()
            }
            result['responseCode'] = HttpStatus.OK;
            result['response'] = "Request successful, "
            return result;
        })

        // we had an error?
        .catch(function (err) {
            console.log(err)
            result['data'] = {};
            result['responseCode'] = HttpStatus.INTERNAL_SERVER_ERROR;
            result['response'] = "Internal Server Error";
            return result;
        })
}

// required to make routes work
module.exports = router;