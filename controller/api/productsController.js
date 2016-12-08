var express = require('express');
var router = express.Router();
var productsService = require('services/productService');
var request = require('request');

function requiredRole(arg1,arg2,arg3){
	return function(req,res,next){
		
		var role = null;
		
		if(req.session.token){
			
			request.get({
				url : 'http://localhost:3000/app/role'
			},function(err,response,body){
				if(err){
					res.status(404).send(err);
				}
				else{
				    role = body;
				    var flag = false;
				    if(arg1 !== 'null' && role === 'admin'){
					      flag =true;
					      next();
				    }
				    if(arg2 !== 'null' && role === 'productHandler'){
					      flag = true;
					      next();
				    }
				    if(arg3 !== 'null' && role === 'user'){
					      flag = true;
					      next();
				    }
				    if(!flag){
					      console.log("Not Authorized");
					      res.sendStatus(401);
				    }
				
				}
			});
			
				
			
		}
	}
	
}


router.post('/create',requiredRole("admin","productHandler","null"),createProduct);
router.get('/allProducts',requiredRole("admin","productHandler","user"),getAllProducts);
router.put('/:_id',requiredRole("admin","productHandler","null"),updateProduct);
router.delete('/:_id',requiredRole("admin","productHandler","null"),deleteProduct);
router.get('/productName/:productName',getProductByName);
module.exports = router;


function createProduct(req,res){
	productsService.createProduct(req.body)
	.then(function(){
		res.sendStatus(200);
	},function(reason){
		res.status(404).send(reason);
	})
	.catch(function(err){
		res.status(400).send(err);
	});
}

function getProductByName(req,res){
	productsService.getProductByName(req.params.productName)
	.then(function(product){
		if(product){
			res.send(product);
		}
		else{
			res.sendStatus(404);
		}
	})
	.catch(function(err){
		res.status(400).send(err);
	});
}

function getAllProducts(req,res){
	productsService.getAllProducts().
	then(function(products){
		if(products){
			res.send(products);
		}
			else{
				res.sendStatus(500);
			}
	})
	.catch(function(err){
		res.status(400).send(err);
	});
}

function updateProduct(req,res){
	productsService.updateProduct(req.params._id,req.body)
	.then(function(){
		res.sendStatus(200);
	})
	.catch(function(err){
		res.status(400).send(err);
	});
}


function deleteProduct(req,res){
	productsService.deleteProduct(req.params._id)
	.then(function(){
		res.sendStatus(200);
	})
	.catch(function(err){
		res.status(400).send(err);
	});
}
