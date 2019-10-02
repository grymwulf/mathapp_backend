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

// get all results

router.get('/all', function(req,res) {
    var result = {};

    data.Result.findAll()
        .then(function(results) {
            result['data'] = results;
            result['responseCode'] = 200;
            result['response'] = "Query Successful";
            results.forEach(element =>{
                console.log(element);
            })
            res.status(result.responseCode);
            res.json(result);
            return;
        })
        .catch(function(err){
            console.log('Error querying all results');
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
// this HAS to be last in file to ensure it doesn't trigger on anything else that might match
router.use(function(req,res) {
    var result = {};
    result['data'] = {
        "endpoint" : "results"
    };
    result['responseCode'] = 501;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
    return;
});

// required to make routes work
module.exports = router;