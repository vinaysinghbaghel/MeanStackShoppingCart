var config = require('config.json');
var lodash = require('lodash');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString,{native_parser : true});
db.bind('users');

var service = {};

service.authenticate = authenticate;
service.create = create;
service.getById = getById;
service.update = update;
service._delete = _delete;
service.getAllUsers = getAllUsers;

module.exports = service;

function getAllUsers(){
	var defer = Q.defer();
	db.users.find().toArray(function(err,users){
		if(err){
			defer.reject(err.name+" : "+err.message);
		}
		if(users){
			defer.resolve(users);
		}
		else{
			defer.resolve();
		}
	});
	
	return defer.promise;
}



function create(userParam){
	var defer = Q.defer();

	db.users.findOne(
				{username : userParam.username},
				function(err,user){
					if(err){
						defer.reject(err.name+':'+err.message);
					}
					if(user){
						defer.reject('user with username '+userParam.username+' exist.');
					}
					else{
						createUser();
					}
				});

	function createUser(){
		var user = lodash.omit(userParam,'password');

		user.hash  = bcrypt.hashSync(userParam.password,10);

		if(user.username === 'admin'){
			user.role = 'admin';
		}
		else if(user.username === 'productHandler'){
			user.role = 'productHandler';
		}
		else{
			user.role = 'user';
		}

		db.users.insert(user,function(err,user){
			if(err){
				defer.reject(err.name + ':'+err.message);
			}
			if(user){
				defer.resolve();
			}
		});
	}
	
	return defer.promise;			
}


function authenticate(username,password){
	var defer = Q.defer();
	db.users.findOne(
					{username : username}
					,function(err,user){
						if(err){
							defer.reject(err.name+':'+err.message);
						}
						if(user && bcrypt.compareSync(password,user.hash)){
							defer.resolve(jwt.sign({sub : user._id},config.secret));
						}
						else{
							defer.resolve();
						}
					});
	return defer.promise;
}

function getById(_id){
	var defer = Q.defer();

	db.users.findById(_id,function(err,user){
		if(err){
			defer.reject(err.name+':'+err.message);
		}
		if(user){
			defer.resolve(lodash.omit(user,'hash'));
		}
		else{
			defer.resolve();
		}
	});

	return defer.promise;
}


function update(_id,userParam){
	var defer = Q.defer();
	db.users.findById(_id,function(err,user){
		if(err){
			defer.reject(err.name+":"+err.message);
		}
		if(user.username !== userParam.username){
			db.users.findOne({username : userParam.username},
								function(err,user){
									if(err){
										defer.reject(err.name+":"+err.message);
									}
									if(user){
										defer.reject('UserName "'+ userParam.username+'" is already taken');
									}
									else{
										updateUser();
									}
								})
		}
		else{
			updateUser();
		}
	});

	function updateUser(){
			
		var set = {
			firstname : userParam.firstname,
			lastname : userParam.lastname,
			username: userParam.username,
			email : userParam.email,
			mobile : userParam.mobile,
			address : userParam.address
		};	

		if(userParam.password){
			set.hash = bcrypt.hashSync(userParam.password,10);
		}

		db.users.update(
			{_id : mongo.helper.toObjectID(_id)},
			{$set:set},function(err,doc){
				if (err) deferred.reject(err.name + ': ' + err.message);

                defer.resolve();
			});
	}
	return defer.promise;
}


function _delete(_id) {
    var deferred = Q.defer();
    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}
