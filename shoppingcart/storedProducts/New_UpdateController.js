var app = angular.module('app');

app.controller('NewUpdateController',function(clientProductService,$window,$stateParams,$state,$rootScope){
	var vm = this;
	vm.flag = false;
	vm.register_update  = register_update;
	if($window.jwttoken){
		vm.product = null;
		
		if($rootScope.user.role === 'user'){
				$state.go('home',{});
			}
			
		if($stateParams.productName !== null){
		
			clientProductService.getProductByName($stateParams.productName)
							.then(function(product){
								vm.product = product;
							});
							
						
		}
		
			
		vm.flag = true;
	}
	else{
		$state.go('home',{});
	}
	
	function register_update(){
		clientProductService.updateProduct(vm.product)
			.then(function(response){
				if(response !== 'OK'){
					window.alert("Something Wrong Happened"+response);
				}
				else{
					window.alert("Updated");
					$state.go('product',{productName : vm.product.productName});
				}
			});
		
	}
	
});
