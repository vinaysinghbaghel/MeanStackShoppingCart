var app = angular.module('app');

app.controller('productController',function($window,$stateParams,clientProductService,$state,clientShoppingCart){
	var vm = this;
	
	vm.addToCart =addToCart;
	vm._delete =_delete;
	vm.product = null;
	vm.flag = false;
	
	if($window.jwttoken){
		vm.flag = true;
	}
	
	if($stateParams.productName !== null){
		
		clientProductService.getProductByName($stateParams.productName)
							.then(function(product){
								vm.product = product;
								
							});
							
						
	}
	
	function _delete(_id){
		clientProductService._delete(_id)
			.then(function(response){
				if(response){
					$state.go('home');
				}else{
					window.alert("Sorry , Something Wrong Happened");
					$state.go('home');
				}
			});
	}
	
	
	function addToCart(productName,productPrice,Quantity){
		
		vm.cartItem = {
								"productName" : "",
								"productPrice" : "",
								"productQuantity" : "",
								"user" : "",
								"cartId" : ""
				};
				vm.cartItem.productName = productName;
				vm.cartItem.productPrice = productPrice;
				vm.cartItem.productQuantity = Quantity;
				console.log("addtocart in controller "+vm.cartItem.productName);
				
				clientShoppingCart.AddCartItem(vm.cartItem)
						.then(function(response){
							if(response.success){
								window.alert(response.message);
							}
							else{
								window.alert(response.message);
							}
						});
	}
});