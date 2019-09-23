const express = require('express');
const router = express.Router();
const data = require('../database');


// get a specific instructor
router.get('/:id?', function(req,res) {

    console.log("get instructor by ID");

    if ((req.params.id === undefined) || // shouldn't happen, but if id is undefined
        (req.params.id == null) || // id is null, again shouldn't happen
        (req.params.id == "") || // id is empty string
        (req.params.id.parseInt() == NaN)) // id is not a number
        {
            result['data'] = {};
            result['responseCode'] = 400;
            result['response'] = "Invalid parameter for request.  ID must be an integer";
            res.status(400);
            res.json(result);
            return;
        }

        // refactored search to separate function for readability
        var result = getInstructor(id);
        
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
            result['data'] = instructors.toJSON();
            result['responseCode'] = 200;
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
            result['responseCode'] = 500;
            result['response'] = "Internal Server Error";
            res.status(result.responseCode);
            res.json(result);
            return;
        })
});


// default handler
// anything not implemented gets a response not implemented
router.use(function(req,res) {
    var result = {};
    result['data'] = {};
    result['responseCode'] = 501;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
    return;
})

function getInstructor(id) {
    // result object
    var result = {};

    // execute query
    data.Instructor.findByPk(id.parseInt())
        .then(function(instructor) {
            if (!instructor) {
                // not found, send proper response
                result['responseCode'] = 204;
                result['response'] = `ID: ${id} does not match a known instructor.`
                result['data'] = {};
                return result;
            }

            // it was found, build response
            result['data'] = {
                "instructor": instructor.toJSON()
            }
            result['responseCode'] = 200;
            result['response'] = "Request successful, "
            return result;
        })

        // we had an error?
        .catch(function (err) {
            console.log(err)
            result['data'] = {};
            result['responseCode'] = 500;
            result['response'] = "Internal Server Error";
            return result;
        })
}