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
                            
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
					actor.comments.push(comment);
					actor.save();
					res.redirect("/actors/"+req.params.id);
				}
			})
		}
	})
})
// Comment edit and update
router.get("/:cid/edit",checkComOwner,function(req,res){
	Comment.findById(req.params.cid,function(err,comment){
		if(err){
			res.redirect("back");
		}
		else{
			res.render("editcom",{actor_id:req.params.id,comment:comment});
		}
	})
})
router.put("/:cid",checkComOwner,function(req,res){
	Comment.findByIdAndUpdate(req.params.cid,req.body.comment,function(err,comment){
		if(err){
			res.redirect("back");
		}
		else{
			res.redirect("/actors/"+req.params.id);
		}
	})
})
// Comment delete
router.delete("/:cid/delete",checkComOwner,function(req,res){
	Comment.findByIdAndRemove(req.params.cid,function(err){
		if(err){
			res.redirect("back");
		}
		else{
			res.redirect("/actors/"+req.params.id);
		}
	})
})

function checkComOwner(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.cid,function(err,comment){
			if(err){
				res.redirect("back");
			}
			else{
				if(comment.author.id.equals(req.user._id)){
					return next();
				}
				else{
					res.redirect("back");
				}
			}
		})
	}
	else{
		res.redirect("back");
	}
}
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	else{
		res.redirect("/login")
	}
}
module.exports=router;