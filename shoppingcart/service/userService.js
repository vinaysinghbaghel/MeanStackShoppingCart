var app = angular.module('app');

app.factory('userService',function($http,$q){
	var service = {};

	service.getCurrentUser = getCurrentUser;
	service.UpdateUser = UpdateUser;
	service._delete = _delete;
	service.allUsers= allUsers;
	service.getById = getById;
	return service;

	
	function getById(_id){
		return $http.get('/api/users/'+_id).then(handleSuccess,handleError);
	}
	
	function allUsers(){
		return $http.get('/api/users/allUsers/').then(handleSuccess,handleError);
	}
	
	function _delete(_id){
		return $http.delete('/api/users/'+_id).then(handleSuccess,handleError);
	}
	
	
	function UpdateUser(user){
		return $http.put('/api/users/'+user._id,user).then(handleSuccess,handleError);
	}
	
	function getCurrentUser(){
		return $http.get('/api/users/current').then(handleSuccess,handleError);
	}

	function handleSuccess(res){
		return res.data;
	}

	function handleError(res){
		return $q.reject(res.data);
	}

});