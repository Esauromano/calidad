const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config.js');


router.get('/demo/v1/accounts/', function(req, res) {
    //res.json(req.session);
    //res.sendfile(path.join(__dirname, '../html', 'index.html'));
    req.pipe(
        request.get('http://127.0.0.1:5984/accounts/_design/api/_list/several/id').on('response', function(response) {
        
            res.statusCode = 200;
            
            response.pipe(res);
        
    }))
        .pipe(res)
});

router.get('/demo/v1/accounts/:id/record', function(req, res) {
    //res.json(req.session);
    //res.sendfile(path.join(__dirname, '../html', 'index.html'));
    var id = req.params.id;
    console.log(id);

     
        request.get('http://127.0.0.1:5984/accounts/_design/api/_list/json/id?key=' + id, function (error, response, body) {
          console.error('error:', error);
          console.log('statusCode:', response && response.statusCode);
          console.log('body:', body);
          
        }
    ).on('response', function(response) {
            res.statusCode = 400;
            res.statusMessage = `{'codigo': ${response.statusCode},'mensaje' : 'El id de usuario no existe, verga'}`;
            response.pipe(res);
        
    })
    
});


module.exports = router;
