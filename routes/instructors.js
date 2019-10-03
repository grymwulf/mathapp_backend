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
router.get('/:id?', function(req,res) {

    console.log("get instructor by ID");

    if ((req.params.id === undefined) || // shouldn't happen, but if id is undefined
        (req.params.id == null) || // id is null, again shouldn't happen
        (req.params.id == "") || // id is empty string
        (req.params.id.parseInt() == NaN)) // id is not a number
        {
            result['data'] = {};
            result['responseCode'] = HttpStatus.BAD_REQUEST;
            result['response'] = "Invalid parameter for request.  ID must be an integer";
            res.status(HttpStatus.BAD_REQUEST);
            res.json(result);
            return;
        }

        // refactored search to separate function for readability
        var result = getInstructorByID(id);
        
        console.log(result);  // debugging output

        // build our response packet
        res.status(result.responseCode);
        res.json(result);
        return;
});

// get list of all instructors
router.get('/', function(req,res) {
    var result = {};
    data.Instructor.findAll()
        .then(function (instructors) {
            result['data'] = instructors;
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
function getInstructorByID(id) {
    // result object
    var result = {};

    // execute query
    data.Instructor.findByPk(id.parseInt())
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