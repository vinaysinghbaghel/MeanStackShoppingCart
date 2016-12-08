var app = angular.module('app');

app.controller('newProduct',function(clientProductService,$window,$stateParams,$state,$rootScope){
	var vm = this;
	vm.flag = false;
	vm.register  = register;
	if($window.jwttoken){
		if($rootScope.user.role === 'user'){
				$state.go('home',{});
			}		
		vm.product = null;
		
		vm.flag = true;
	}
	else{
		$state.go('home',{});
	}
	
	function register(){
		clientProductService.createProduct(vm.product)
			.then(function(response){
				if(response !== 'OK'){
					window.alert("Something Wrong Happened - "+response);
				}
				else{
					window.alert("Created");
					$state.go('product',{productName : vm.product.productName});
				}
			});
		
	}
	
});