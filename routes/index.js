const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config.js');

router.get('/demo/v1/accounts/', function(req, res) {

    req.pipe(
        request.get('http://127.0.0.1:5984/accounts/_design/api/_list/several/id')
        .on('error', (err) => {
          console.error(err.stack);
        })).pipe(res)
});

router.get('/demo/v1/accounts/:id/record', function(req, res) {

    var id = req.params.id;
    console.log(id);
        request.get('http://127.0.0.1:5984/accounts/_design/api/_list/json/id?key=' + id, function (error, response, body) {
            
          console.error('error:', error);
          console.log('statusCode:', response && response.statusCode);
          console.log('body:', body);
          if ( body.hasOwnProperty('codigo') ) {
            if (body.codigo == 400) {
                res.send
            }
          }
        }
    )
});


module.exports = router;
