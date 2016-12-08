var app = require('express');
var router = app.Router();


router.get('/',function(req,res){
	delete req.session.token;
	
	res.redirect('/app');
});

module.exports = router;