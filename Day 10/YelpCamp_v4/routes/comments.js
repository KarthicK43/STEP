var express=require("express");
var router=express.Router({mergeParams:true});

var Actor = require("../models/actors");
var Comment = require("../models/comments");
var User = require("../models/user")
// Comments
router.get("/new",isLoggedIn,function(req,res){
	Actor.findById(req.params.id,function(err,actor){
		if(err){
			console.log(err);
		}
		else{
			res.render("newcom",{actor:actor});
		}
	})
})

router.post("/",isLoggedIn,function(req,res){
	Actor.findById(req.params.id,function(err,actor){
		if(err){
			console.log(err);
			res.redirect("/actors");
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					res.redirect("/actors");
				}
				else{
					actor.comments.push(comment);
					actor.save();
					res.redirect("/actors/"+req.params.id);
				}
			})
		}
	})
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