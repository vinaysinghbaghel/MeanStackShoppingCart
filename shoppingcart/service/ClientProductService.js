var app = angular.module('app');

app.factory('clientProductService',function($http,$q){
	
	var service = {};
	
	service.createProduct = createProduct;
	service.getAllProducts = getAllProducts;
	service.getProductByName = getProductByName;
	service._delete = _delete;
	service.updateProduct = updateProduct;
	
	return service;
	
	function updateProduct(product){
		return $http.put('/api/products/'+product._id,product).then(handleSuccess,handleError);
	}
	
	function createProduct(product){
		return $http.post('/api/products/create',product).then(handleSuccess,handleError);
	}
	
	function getAllProducts(){
		return $http.get('/api/products/allProducts').then(handleSuccess,handleError);
	}
	
	function getProductByName(productName){
		return $http.get('/api/products/productName/'+productName).then(handleSuccess,handleError);
	}
	
	function _delete(_id){
		return $http.delete('/api/products/'+_id).then(handleSuccess,handleError);
	}
	
	function handleSuccess(res){
		return res.data;
	}
	
	function handleError(res){
		return $q.reject(res.data);
	}
});
