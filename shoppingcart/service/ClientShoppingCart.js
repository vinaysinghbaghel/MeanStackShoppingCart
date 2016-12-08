var app = angular.module('app');

app.factory('clientShoppingCart',function($timeout,$filter,$q,clientProductService,$rootScope){
	
	var service = {};
	
	service.setCartItems = setCartItems;
	service.getCartItems = getCartItems;
	service.AddCartItem = AddCartItem;
	service.GetCartItemByName = GetCartItemByName;
	service.GetCartItemById = GetCartItemById;
	service.RemoveCartItem = RemoveCartItem;
	service.GetAllCartItems = GetAllCartItems;
	service.GetTotalCartItemCount = GetTotalCartItemCount;
	service.GetTotalCartItemPrice = GetTotalCartItemPrice;
	service.GetQuantityByName = GetQuantityByName;
	
	return service;
	
	
		function AddCartItem(cartItem){
			var defer = $q.defer();
			var originalQuantity= 0;
			$timeout(function(){
				GetCartItemByName(cartItem.productName)
				.then(function(Item){
					if(Item !== null){ //Item loop start here
						
							clientProductService.getProductByName(cartItem.productName)
								.then(function(product){
									if(product !== null){//product not null if
										originalQuantity = product.productQuantity;
										if(Item.productQuantity >= 0){ //Item.productQantity if start here
											if(cartItem.productQuantity >=0){ //if start here for cartItem.quantity
											
												if(Item.productQuantity < product.productQuantity)
												{
													Item.productQuantity = legalNumber(Item.productQuantity + cartItem.productQuantity);
												}
												else{
													defer.resolve({success : false,message:'Product out of stock.'+cartItem.productName});
												}	
											}//if end here for cartItem.quantity
											else{
												
												Item.productQuantity = legalNumber(Item.productQuantity + cartItem.productQuantity);
											
											} // else part for cartItem.quantity
											
											if(Item.productQuantity <= originalQuantity && Item.productQuantity > 0){
												var cartItems = getCartItems();
								
												for(i=0;i<=cartItems.length;i++){
							
													if(cartItems[i].productName === cartItem.productName){
														cartItems[i].productQuantity = Item.productQuantity;
										
														break;
													}
												}	
												setCartItems(cartItems);
									
												defer.resolve({success:true,message:'Quantity of product is updated'+cartItem.productName});
											} 
											else{
												defer.resolve({success: false,message:'Please Update Quantity'+cartItem.productName});
											}
										}//Item.productQantity if end here
										else{
												defer.resolve({success: false,message:'Item is available in cart with 0 quantity'+cartItem.productName});
										}//Item.productQantity else end here
										
									}	//product not null loops end
									else{
										defer.resolve({success:false,message:'Product is not in DataBase'+cartItem.productName});
									}//product not null else part
								});
						
					}//if part of Item loop End Here
					else{
						clientProductService.getProductByName(cartItem.productName)
								.then(function(product){
									if(product !== null){
									
										if(product.productQuantity > 0){
											var cartItems = getCartItems();
								
								
											if(cartItems.length !== 0){
												var lastItem = cartItems[cartItems.length - 1];
												var cartId = lastItem.cartId + 1;
												cartItem.cartId = cartId;
											}
											else{
												cartItem.cartId = 0;
											}
								
											cartItems.push(cartItem);
								
											setCartItems(cartItems);
								
											defer.resolve({success: true,message:'New Item Added in cart'+cartItem.productName});
										}
										else{
											defer.resolve({success:false,message:'Product Quantity is less than 0'+cartItem.productName});
										}
									}
								});		
					}//Item loop end here
				});
			},1000);
			
			return defer.promise;
		}
	
	
	
		function RemoveCartItem(productName){
		var defer = $q.defer();
		
		var cartItems =  getCartItems();
		
		for(i =0; i< cartItems.length ;i++){
			var item = cartItems[i];
			if(item.productName === productName){
				cartItems.splice(i,1);
				break;
			}
		}
		
		setCartItems(cartItems);
		
		defer.resolve();
		return defer.promise;
	}
	
	
		function GetCartItemById(cartId){
			var defer = $q.defer();
			var name = $filter('filter') (getCartItems(),{cartId:cartId});
			var product = name.length ? name[0] : null;
			defer.resolve(product);
			
			return defer.promise;
		}
	
		function GetCartItemByName(productName){
			var defer =$q.defer();
			var cartItem = [];
			var name = $filter('filter') (getCartItems(),{productName:productName});
			cartItem = name.length ? name[0] : null;
			
			defer.resolve(cartItem);
			
			return defer.promise;
		}
	
	
		function GetQuantityByName(productName){
			var quantity = 0;
			var cartItems = getCartItems();
			for(var i=0;i<cartItems.length;i++){
				if(cartItems[i].productName === productName){
					quantity = cartItems[i].productQuantity;
				}
			}
			return quantity;
		}
		
		
		function GetTotalCartItemPrice(){
				var cartItem = getCartItems();
				var price = 0;
				var quantity= 0;
				var total_price = 0;
				total_price = legalNumber(total_price);
				price = legalNumber(price);
				quantity = legalNumber(quantity);
				
				for(var i =0;i<cartItem.length;i++){
					quantity = cartItem[i].productQuantity;
					price = cartItem[i].productPrice;
					total_price += price*quantity;
					price = 0;
					quantity = 0;
				}
				if(total_price === 0){
					return 0;
				}else{
				return total_price;
				}
		}
		
		
		function GetTotalCartItemCount(){
			var cartItem = getCartItems();
			return cartItem.length;
		}
		
		
		function GetAllCartItems(){
			var defer = $q.defer();
			defer.resolve(getCartItems());
			
			return defer.promise;
		}
		
		function getCartItems(){
			if(!localStorage.cartItems){
				return 	localStorage.cartItems = JSON.stringify([]);
			}
			return JSON.parse(localStorage.cartItems);
		}
		
		function setCartItems(cartItems){
			localStorage.cartItems = JSON.stringify(cartItems);
		}
	
		function legalNumber(value){
	
		value = value * 1;
		
		return isNaN(value) ? 0 : value;
	}
	
});