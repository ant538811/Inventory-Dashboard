// sets dependencies
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

// configure application to render html with ejs
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));

// use middleware
app.use(bodyParser());
app.use(require('./controllers/controller.js'));

// starts the server
app.listen(3000, function(){
	console.log('Server is running on port 3000');
});