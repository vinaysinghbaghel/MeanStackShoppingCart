var app = angular.module('app');

app.controller('showProducts',function($window,clientProductService,$state,$rootScope){
	var vm = this;
	vm._delete = _delete;
	vm.productList = null;
	vm.flag = false;
	if($window.jwttoken){
		if($rootScope.user.role === 'user'){
				$state.go('home',{});
			}
			
			
		clientProductService.getAllProducts()
				.then(function(products){
					
					vm.productList = products;
					vm.flag = true;
				});	
				
				
	}
	else{
		$state.go('home',{});
	}
	
	function _delete(_id){
		if($window.jwttoken){
		clientProductService._delete(_id)
			.then(function(response){
				if(response){
					clientProductService.getAllProducts()
						.then(function(products){
								
								vm.productList = products;
								window.alert('Product deleted');
						});	
				}else{
					window.alert("Sorry , Something Wrong Happened");
					$state.go('home');
				}
			});
			
		}	
	}
});