var app = angular.module('app');

app.controller('homeController',function(userService,$rootScope,$window,clientProductService,$q,clientShoppingCart){
	var vm = this;

	vm.addToCart = addToCart;
	
	
	function addToCart (productName,Price,Quantity){
				vm.cartItem = {
								"productName" : "",
								"productPrice" : "",
								"productQuantity" : "",
								"user" : "",
								"cartId" : ""
				};
				vm.cartItem.productName = productName;
				vm.cartItem.productPrice = Price;
				vm.cartItem.productQuantity = Quantity;
				
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
	
	vm.productList = [];

		vm.fakeProduct =[
			{
						 "productName" : "Muscletech-Nitrotech-2",
						 "productCategory" : "Power Gainer",
						 "productSubCategory" : "Protein",
						 "productQuantity" : "6",
						 "productPrice" : "110",
						 "productMaxDiscount" :"2",
						 "productReview" : "4",
						 "productDescription" : "Muscletech-Nitrotech-2.",
						 "productSize" : "6kg",
						 "productImg" :"Muscletech-Nitrotech-2",
						 "productCompany":"Muscletech",
							 "Gender" : "Men"
					},
					{
						 "productName" : "Acer-Aspire-NX-MYKSI",
						 "productCategory" : "Laptop",
						 "productSubCategory" : "Electronics",
						 "productQuantity" : "3",
						 "productPrice" : "170",
						 "productMaxDiscount" :"10",
						 "productReview" : "4",
						 "productDescription" : "Acer-Aspire-NX-MYKSI",
						 "productSize" : "Acer-Aspire-NX-MYKSI 4GB ram",
						 "productImg" :"Acer-Aspire-NX-MYKSI",
						 "productCompany":"Acer",
							 "Gender" : "Both"
					},
					{
						 "productName" : "HP-G50-80-Notebook",
						 "productCategory" : "Notebook",
						 "productSubCategory" : "Electronics",
						 "productQuantity" : "6",
						 "productPrice" : "600",
						 "productMaxDiscount" :"0",
						 "productReview" : "3",
						 "productDescription" : "HP-G50-80-Notebook with 2GB ram and 500gb HardDisk.",
						 "productSize" : "15",
						 "productImg" :"HP-G50-80-Notebook",
						 "productCompany":"HP",
							 "Gender" : "Both"
					},
					{
						 "productName" : "Chevit-Sneakers-Black",
						 "productCategory" : "Sneakers",
						 "productSubCategory" : "Shoes",
						 "productQuantity" : "3",
						 "productPrice" : "7",
						 "productMaxDiscount" :"10",
						 "productReview" : "4",
						 "productDescription" : "Chevit Sneakers Black",
						 "productSize" : "8,9,10",
						 "productImg" :"Chevit-Sneakers-Black",
						 "productCompany":"Chevit",
							 "Gender" : "Men"
					},
					{
						 "productName" : "Ahmedabad-Cotton-Floral(Red-white)",
						 "productCategory" : "Bed Sheet",
						 "productSubCategory" : "Clothes",
						 "productQuantity" : "6",
						 "productPrice" : "10",
						 "productMaxDiscount" :"10",
						 "productReview" : "5",
						 "productDescription" : "Ahmedabad-Cotton-Floral Full Size Bed Sheet",
						 "productSize" : "Full Sheet",
						 "productImg" :"Ahmedabad-Cotton-Floral",
						 "productCompany":"Floral",
							 "Gender" : "Both"
					},
					{
						 "productName" : "MR-BUTTON Suite",
						 "productCategory" : "Suites",
						 "productSubCategory" : "Clothes",
						 "productQuantity" : "7",
						 "productPrice" : "15",
						 "productMaxDiscount" :"20",
						 "productReview" : "4",
						 "productDescription" : "MR-BUTTON Suites",
						 "productSize" : "Standard",
						 "productImg" :"MR-BUTTON",
						 "productCompany":"MR-BUTTON",
							 "Gender" : "Men"
					},
					
					{
						 "productName" : "SkyBags Laptop Bags (Red)",
						 "productCategory" : "Laptop Bags",
						 "productSubCategory" : "Bags",
						 "productQuantity" : "5",
						 "productPrice" : "40",
						 "productMaxDiscount" :"5",
						 "productReview" : "4.5",
						 "productDescription" : "SkyBags Laptop bags for geeks",
						 "productSize" : "Standard",
						 "productImg" :"Skybags-Geek-04-Red",
						 "productCompany":"SkyBags",
							 "Gender" : "Both"
					},
					{
						 "productName" : "Headly-105-Kg-Home-Gym",
						 "productCategory" : "Gym",
						 "productSubCategory" : "Home Gym",
						 "productQuantity" : "4",
						 "productPrice" : "50",
						 "productMaxDiscount" :"20",
						 "productReview" : "4",
						 "productDescription" : "Headly-105-Kg-Home-Gym",
						 "productSize" : "Standard",
						 "productImg" :"Headly-105-Kg-Home-Gym",
						 "productCompany":"Headly",
							 "Gender" : "Both"
					},
			{
			 "productName" : "Sony Led Tv",
			 "productCategory" : "Electronics",
			 "productSubCategory" : "LED,TV,LCD",
			 "productQuantity" : "10",
			 "productPrice" : "400",
			 "productMaxDiscount" :"20",
			 "productReview" : "5",
			 "productDescription" : "SONY LED 42' Bravia .The Best You can get.",
			 "productSize" : "42",
			 "productImg" : "sonyledtv",
			 "productCompany" :"Sony",
			 "Gender" : "Both"
			},
			{
				 "productName" : "Samsung Led Tv",
				 "productCategory" : "Electronics",
				 "productSubCategory" : "LED,TV,LCD",
				 "productQuantity" : "10",
				 "productPrice" : "510",
				 "productMaxDiscount" :"10",
				 "productReview" : "4.5",
				 "productDescription" : "SAMSUNG LED 42' Bravia .The Best You can get.",
				 "productSize" : "42",
				 "productImg" :"samsungledtv",
				 "productCompany":"Samsung",
				 "Gender" : "Both"
					 
				},
				{
					 "productName" : "LG Led Tv",
					 "productCategory" : "Electronics",
					 "productSubCategory" : "LED,TV,LCD",
					 "productQuantity" : "0",
					 "productPrice" : "414",
					 "productMaxDiscount" :"50",
					 "productReview" : "4.5",
					 "productDescription" : "LG LED 42' Bravia .The Best You can get.",
					 "productSize" : "42",
					 "productImg" :"Lgledtv",
					 "productCompany":"LG",
					"Gender" : "Both"	 
				},
				{
					 "productName" : "Panasonic Led Tv",
					 "productCategory" : "Electronics",
					 "productSubCategory" : "LED,TV,LCD",
					 "productQuantity" : "10",
					 "productPrice" : "410",
					 "productMaxDiscount" :"30",
					 "productReview" : "4.5",
					 "productDescription" : "Panasonic LED 42' Bravia .The Best You can get.",
					 "productSize" : "42",
					 "productImg" :"panasonictv",
					 "productCompany":"Panasonic",
						 "Gender" : "Both"
					},
					{
						 "productName" : "HTC Led Tv",
						 "productCategory" : "Electronics",
						 "productSubCategory" : "LED,TV,LCD",
						 "productQuantity" : "10",
						 "productPrice" : "410",
						 "productMaxDiscount" :"30",
						 "productReview" : "4.5",
						 "productDescription" : "HTC LED 42' Bravia .The Best You can get.",
						 "productSize" : "42",
						 "productImg" :"htcledtv",
						 "productCompany":"HTC",
							 "Gender" : "Both"
					},
					{
						 "productName" : "Adidas Neo LITE Racer Sneakers",
						 "productCategory" : "Shoes",
						 "productSubCategory" : "Personal Asset",
						 "productQuantity" : "10",
						 "productPrice" : "15",
						 "productMaxDiscount" :"50",
						 "productReview" : "4.5",
						 "productDescription" : "For Women",
						 "productSize" : "6",
						 "productImg" :"adidasLITESneakers",
						 "productCompany":"Adidas",
							 "Gender" : "Women"
					},
					{
						 "productName" : "Woodland Men Outdoor Shoes",
						 "productCategory" : "Shoes",
						 "productSubCategory" : "Personal Asset",
						 "productQuantity" : "1",
						 "productPrice" : "20",
						 "productMaxDiscount" :"20",
						 "productReview" : "4",
						 "productDescription" : "For Men",
						 "productSize" : "8,9,10,11",
						 "productImg" :"woodlanOutdoorShoes",
						 "productCompany":"WoodLand",
							 "Gender" : "Men"
					},
					{
						 "productName" : "Beonza Denim Jeans Loafers  (Blue)",
						 "productCategory" : "Shoes",
						 "productSubCategory" : "Personal Asset",
						 "productQuantity" : "2",
						 "productPrice" : "20",
						 "productMaxDiscount" :"20",
						 "productReview" : "4",
						 "productDescription" : "For Men",
						 "productSize" : "8,9,10,11",
						 "productImg" :"BeonzaDenimShoes",
						 "productCompany":"Beonza",
							 "Gender" : "Men"
					}		
		];

        vm.user = null;
		vm.flag = false;
        if($window.jwttoken){
			vm.flag = true;
			userService.getCurrentUser().then(function (user) {
					vm.user = user;
					$rootScope.user = vm.user;
					$rootScope.user.role = vm.user.role;
				})
				.then(function(){
		
			clientProductService.getAllProducts()
				.then(function(products){
					vm.productList = products;
					
				});	
			});	
    }

        function initController() {
			var defer = $q.defer();
            // get current user
            defer.resolve(function(){
			});
			
			return defer.promise;
        }
});
