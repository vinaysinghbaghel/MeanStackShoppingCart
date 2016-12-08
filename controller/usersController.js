var express = require('express');
var router = express.Router();
var config = require('config.json');
var userService = require('services/userService');
var request = require('request');


function requiredRole(arg1,arg2,arg3){
	return function(req,res,next){
		
		var role = null;
		
		if(req.session.token){
			
			request.get({
				url : 'http://localhost:3000/app/role'
			},function(err,response,body){
				if(err){
					res.status(404).send(err);
				}
				else{
					role = body;
					var flag = false;
					if(arg1 !== 'null' && role === 'admin'){
						flag =true;
						next();
					}
					if(arg2 !== 'null' && role === 'productHandler'){
						flag = true;
						next();
					}
					if(arg3 !== 'null' && role === 'user'){
						flag = true;
						next();
					}
					if(!flag){
						console.log("Not Authorized");
						res.sendStatus(401);
					}
				
				}
			});
			
				
			
		}
	}
	
}


router.delete('/:_id',requiredRole("admin","null","null"),_delete);
router.put('/:_id',requiredRole("admin","null","user"),update);
router.post('/register',register);
router.post('/authenticate',authenticate);
router.get('/current',current);
router.get('/allUsers',requiredRole("admin","null","null"),getAllUsers);
router.get('/:_id',requiredRole("admin","null","user"),getById);
module.exports = router;


function getAllUsers(req,res){
	userService.getAllUsers()
		.then(function(users){
			if(users){
			res.send(users);
			}else{
				res.sendStatus(503);
			}
		})
		.catch(function(err){
			res.status(404).send(err);
		});
}

function _delete(req,res){
	userService._delete(req.params._id)
		.then(function(response){
	if(response){
				res.status(503).send(response);
			}else{
				res.sendStatus(200);
			}
		})
		.catch(function(err){
			res.status(404).send(err);
		});
}

function update(req,res){
	userService.update(req.params._id,req.body)
		.then(function(response){
			if(response){
				res.status(503).send(response);
			}else{
				res.sendStatus(200);
			}
		})
		.catch(function(err){
			res.status(404).send(err);
		});
}

function register(req,res){
	userService.create(req.body).
	then(function(){
		res.sendStatus(200);
	})
	.catch(function(err){
		res.status(400).send(err);
	});
}

function authenticate(req,res){
	userService.authenticate(req.body.username,req.body.password)
	.then(function(token){
		if(token){
			res.send({token:token});
		}
		else{
			res.status(401).send("UserName and Password are Incorrect");
		}
	})
	.catch(function(err){
		res.status(400).send(err);
	});
}

function current(req,res){
	userService.getById(req.user.sub)
	.then(function(user){
		if(user){
			res.send(user);
		}
		else{
			res.sendStatus(404);
		}
	})
	.catch(function(err){
		res.status(400).send(err);
	});

}


function getById(req,res){
	userService.getById(req.params._id)
	.then(function(user){
		if(user){
			res.status(200).send(user);
		}
		else{
			res.sendStatus(404);
		}
	})
	.catch(function(err){
		res.status(400).send(err);
	});

}