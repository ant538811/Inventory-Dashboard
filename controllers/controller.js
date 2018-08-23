// set dependencies
var express = require('express');
var model = require('../models/model.js');
var router = express.Router();

// initialize result object
var results = [];

// middleware functions
router.get('/', function (req, res){
	res.render('index', {
		results
	});
});
// post request to make ps query but only when criteria has been defined. If date is not chosen, then it defaults to zero
router.post('/add', function (req, res){
	var criteria = req.body.criteria;
	var days = req.body.days;
	if (days == ''){
			days = 0;
		}
	if (criteria != ''){
	console.log(model.postdata(criteria, days));
	results.push(model.postdata(criteria, days));
	}
	res.redirect('/');
});

// post request to test the acceptance of input
// router.post('/test', function (req, res){
// 	var criteria = req.body.criteria;
// 	var days = req.body.days;
// 	results.push(model.testfunc(criteria, days));
// 	results.push(model.postdata());
// 	res.redirect('/');
// });

// export the router object as the module
module.exports = router;