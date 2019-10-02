const express = require('express');
const router = express.Router();
const data = require('../database');

// get all results

router.get('/', function(req,res) {
    var result = {};

    data.Result.getAll()
        .then(function(results) {
            result['data'] = results.toJson();
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
    result['data'] = {};
    result['responseCode'] = 501;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
    return;
})