var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');

const app = express();
//app setup



//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);

console.log("server on port", port);
