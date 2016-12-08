var app = angular.module('app');

app.controller('updateUser',function($window,$state,$stateParams,userService,$rootScope){
	
	var vm  = this;
	vm.user = null;
	vm.flag =  false;
	vm.updateUser = updateUser;
	
	
	if($stateParams.userId !== null){

		if($window.jwttoken){
			
			if($rootScope.user.role === 'productHandler'){
				$state.go('home',{});
			}
			
			if($rootScope.user._id !== $stateParams.userId && $rootScope.user.role === 'user'){
				window.alert("You Are Trying to Access Unauthorized Account");
				
				$state.go('home');
			}
			else{
			
			userService.getById($stateParams.userId)
				.then(function(user){
					vm.user = user;
					vm.flag = true;
				});
			}	
		}
		else{
			$state.go('home');
		}
		
	}
	
	
	function updateUser(){
		userService.UpdateUser(vm.user)
			.then(function(response){
				if(response !== 'OK'){
					window.alert("User not Updated with response status "+response);
					$state.go('showUsers');
				}
				else{
					window.alert('User Updated');
				}
			});
	}
});