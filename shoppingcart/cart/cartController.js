var app = angular.module('app');

app.controller('cartController',function(clientShoppingCart,$window){
	var vm = this;
	vm.getCartItems = [];
	vm.GetAllProducts = GetAllProducts;
	vm.GetTotalItemPrice = GetTotalItemPrice;
	vm.GetTotalItemCount = GetTotalItemCount;
	vm.GetQuantityByName = GetQuantityByName;
	vm.AddToCart = AddToCart;
	vm.RemoveCartItem = RemoveCartItem;
		vm.cartItem = {
								"productName" : "",
								"productPrice" : "",
								"productQuantity" : "",
								"user" : "",
								"cartId" : ""
				};
	
	
	(function initController(){
		GetAllProducts();
	})();
	
	function GetAllProducts(){
		clientShoppingCart.GetAllCartItems()
			.then(function(getItems){
				if(getItems !== null){
					
					vm.getCartItems = getItems;
					}
			});
	}
	
	
	function GetTotalItemPrice(){
		return clientShoppingCart.GetTotalCartItemPrice();
	}
	
	function GetTotalItemCount(){
		return clientShoppingCart.GetTotalCartItemCount();
	}
	
	function GetQuantityByName(productName){
		return clientShoppingCart.GetQuantityByName(productName);
	}
	
	function AddToCart(productName,quantity){
		vm.cartItem.productName = productName;
		vm.cartItem.productQuantity = quantity;
		
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
	
	function RemoveCartItem(productName){
		clientShoppingCart.RemoveCartItem(productName)
			.then(function(){
				GetAllProducts();
			});
	}	
	
});
