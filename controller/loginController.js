var express = require('express');
var router = express.Router();
var config = require('config.json');
var request = require('request');


router.use('/',function(req,res,next){
	if(req.session.token){
		return res.redirect('/app');
	}
	next();
});

router.get('/',function(req,res){
	var viewData = {success :req.session.success};

	delete req.session.success;

	res.render('login',viewData);
});

router.post('/',function(req,res){
	request.post({
		url : config.apiUrl + '/users/authenticate',
		form : req.body,
		json : true
	},function(err,response,body){
		if(err){
			return res.render('login',{error :err.message});
		}
		if(!body.token){
			return res.render('login',{error:body,username : req.body.username});
		}

		req.session.token = body.token;

		res.redirect('/app');
	});
});

module.exports = router;