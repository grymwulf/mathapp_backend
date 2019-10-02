const express = require('express');
const router = express.Router();
const data = require('../database');





// default handler
// anything not implemented gets a response not implemented
// this HAS to be last in file to ensure it doesn't trigger on anything else that might match
router.use(function(req,res) {
    var result = {};
    result['data'] = {
        "endpoint" : "student"
    };
    result['responseCode'] = 501;
    result['response'] = "Not Implemented";
    res.status(result.responseCode);
    res.json(result);
    return;
});

// required to make routes work
module.exports = router;