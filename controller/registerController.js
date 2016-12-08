var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.use('/',function(req,res,next){
	if(req.session.token){
		return res.redirect('/app');
	}

	next();
});


router.get('/',function(req,res){
	res.render('register');
});

router.post('/',function(req,res){
	
	request.post({
		url : config.apiUrl + '/users/register',
		form : req.body,
		json : true
	},function(error,response,body){
		if(error){
			return res.render('register',{error : error.message});
		}

		if(response.statusCode !== 200){
			return res.render('register',{
				error :response.body,
				firstname : req.body.firstname,
				lastname : req.body.lastname,
				username : req.body.username,
				email : req.body.email,
				mobile : req.body.mobile,
				address: req.body.address
			});
		}

		req.session.success = "Registration Successful";

		return res.redirect('/login');

	});

});

module.exports = router;