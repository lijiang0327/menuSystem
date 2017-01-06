'use strict';

var http = require('http');
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
app.get('/', (req, res) => {
    res.end('<h1>Hello world!</h1>');
});
console.log('11');
var server = http.createServer(app);

server.listen(8009);