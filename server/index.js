/**
 * Created by bushan on 6/5/16.
 */
var express = require('express');
var app = express();
var jwt = require('express-jwt');
var cors = require('cors');


app.use(cors());


// use a middleware

var authCheck = jwt({
    secret:new Buffer('IJCqyWYX_3jj4KxbYfHYjIN2PFZ1NMsgLr8qUlFMFfY-pkzUL1zklTKqCsUOviSc','base64'),
    audience:'SWvArQDueSGeLIY5j1oVQAgZy6Jg6fYt'
});


app.get('/api/public',function(req,res){
    res.json({message:'Message form public endpoint'});
});


app.get('/api/private',authCheck,function(req,res){
    res.json({message:'Message form private endpoint'});
});


app.listen(3001);

console.log('Listeing on localhost:3001');