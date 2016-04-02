var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var router = require('./router.js');
var mongoose = require('mongoose');

//db setup
mongoose.connect('mongodb://localhost:auth/auth');

const app = express();
//app setup
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

router(app);
/*Server setup */

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);

console.log("server on port", port);
