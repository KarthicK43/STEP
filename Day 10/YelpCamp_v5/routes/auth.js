var express=require("express");
var router=express.Router();
var User = require("../models/user")
var passport=require("passport");
// Register
router.get("/register",function(req,res){
	res.render("register");
})
router.post("/register",function(req,res){
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")
		(req,res,function(){
			res.redirect("/actors");
		});
	});
});
// Login
router.get("/login",function(req,res){
	res.render("login");
})
router.post("/login", passport.authenticate("local", {successRedirect: "/actors",failureRedirect:"/login"}),function(req,res){

})
// Logout
router.get("/logout",function(req,res){
	req.logOut();
	res.redirect("/actors");
})
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	else{
		res.redirect("/login")
	}
}
module.exports=router;