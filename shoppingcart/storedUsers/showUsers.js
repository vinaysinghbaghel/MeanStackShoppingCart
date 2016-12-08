var app = angular.module('app');

app.controller('showUsers',function(userService,$window,$state,$rootScope){
	var vm = this;
	vm.users = null;
	vm._delete = _delete;
	vm.flag = false;

		if($window.jwttoken){
			
			if($rootScope.user.role !== 'admin'){
				$state.go('home',{});
			}
			
			userService.allUsers()
				.then(function(users){
				
					vm.users = users;
					vm.flag = true;
				});
				
	
		}
		else{
			$state.go('home',{});
		}
	
	function _delete(_id){
		userService._delete(_id)
			.then(function(res){
					if(res !== 'OK'){
						window.alert('User Not Deleted with response status '+res);
					}
					else{
						window.alert('User Deleted');
						userService.allUsers()
							.then(function(users){
				
								vm.users = users;
					
							});
					}
			});
	}
	 
});