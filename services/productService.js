var config = require('config.json');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString,{native_parser:true});
db.bind('products');


var service = {};

service.createProduct = createProduct;
service.getProductByName = getProductByName;
service.getAllProducts = getAllProducts;
service.updateProduct = updateProduct;
service.deleteProduct = deleteProduct;

module.exports = service;

function createProduct(productParam){
	var defer = Q.defer();
	db.products.findOne({productName : productParam.productName},function(err,product){
			if(err){
				defer.reject(err.name + ":" + err.message);
			}
			if(product){
				defer.reject('Product with productName"'+ productParam.productName+'" already Exist');
			}
			else{
				newProduct();
			}
	});
	
	function newProduct(){
			
		var product = productParam;	
		
		db.products.insert(product,function(err,product){
			if(err){
				defer.reject(err.name + ":" + err.message);
			}
			if(product){
				defer.resolve();
			}
		});
	}
	
	return defer.promise;
}

function getProductByName(productName){
	var defer = Q.defer();
	
	db.products.findOne({productName:productName},function(err,product){
		if(err){
			defer.reject(err.name + ":" + err.message);
		}
		if(product){
			defer.resolve(product);
		}
		else{
			//product not exist.
			defer.resolve();
		}
	});
		
	return defer.promise;
}


function getAllProducts(){
	var defer = Q.defer();
	
	db.products.find().toArray(function(err,products){
		if(err){
			defer.reject(err.name + ":" + err.message);
		}
		if(products){
			defer.resolve(products);
		}
		else{
			//products not exist.
			defer.resolve();
		}
	});
		
	return defer.promise;
}

function updateProduct(_id,productParam){
	var defer = Q.defer();
	db.products.findById(_id,function(err,product){
		if(err){
			defer.reject(err.name+":"+err.message);
		}
		if(product.productName !== productParam.productName){
			db.products.findOne({productName:productParam.productName},function(err,product){
				if(err){
					defer.reject(err.name+":"+err.message);
				}
				if(product){
					defer.reject('Product with product Name "'+productParam.productName+'" already exist');
				}
				else{
					updateProductValue();
				}
			});
		}
		else{
			updateProductValue();
		}
	});
	
	function updateProductValue(){
		var set = {
						"productName" : productParam.productName,
						 "productCategory" : productParam.productCategory,
						 "productSubCategory" : productParam.productSubCategory,
						 "productQuantity" : productParam.productQuantity,
						 "productPrice" : productParam.productPrice,
						 "productMaxDiscount" :productParam.productMaxDiscount,
						 "productReview" : productParam.productReview,
						 "productDescription" : productParam.productDescription,
						 "productSize" : productParam.productSize,
						 "productImg" :productParam.productImg,
						 "productCompany":productParam.productCompany,
							 "Gender" : productParam.Gender
		};
		
		db.products.update(
							{_id:mongo.helper.toObjectID(_id)},
							{$set:set},function(err,doc){
								if(err){
									defer.reject(err.name+":"+err.message);
								}
								
								defer.resolve();
							});
		
	}
	
	return defer.promise;
}


function deleteProduct(_id){
	var defer = Q.defer();
	
	db.products.remove({_id:mongo.helper.toObjectID(_id)},function(err,doc){
		if(err){
									defer.reject(err.name+":"+err.message);
								}
								
								defer.resolve();
	});
	
	return defer.promise;
}
