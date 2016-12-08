var express = require('express');
var app = express();
var router = express.Router();
var request = require('request');
var config = require('config.json');


var role1 = null;

router.use('/',function(req,res,next){
	if(req.session.token){
		request.get({
				url : config.apiUrl +'/users/current',
				headers : {
					'Authorization' : 'Bearer ' + req.session.token
				}
			},function(err,response,user){
				if(err){
					res.status(404).send(err);
				}
				if(user){
					
					//This logic of getting user role will work only if role is last attribute in user array
					var role=user.substring(user.lastIndexOf(":")+1,user.lastIndexOf("}"));
					
					role1 = role.replace(/^"(.*)"$/, '$1');
					
				}
				
			});
	}
	
	
	next();
});

router.get('/role',function(req,res){
	res.send(role1);
});


router.get('/token',function(req,res){
	res.send(req.session.token);	
});

router.use('/',express.static('shoppingcart'));

module.exports = router;