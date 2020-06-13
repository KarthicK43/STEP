var express=require("express");
var router=express.Router({mergeParams:true});
var Actor = require("../models/actors");
var Comment = require("../models/comments");

// Actors Main
router.get("/",function(req,res){
	Actor.find({},function(err,actors){
			   if(err){
				   console.log(err);
			   }
				else{
					res.render("actors",{actors:actors});
				}
			   })
})
// Add new Actor
router.get("/new",isLoggedIn,function(req,res){
	res.render("newactor");
})
// Show page
router.get("/:id",function(req,res){
	Actor.findById(req.params.id).populate("comments").exec(function(err,actor){
		if(err){
			console.log(err);
		}
		else{
			res.render("descact",{actor:actor});
		}
	})
})
// Redirect After new
router.post("/",isLoggedIn,function(req,res){
    var author={
        id:req.user._id,
        username:req.user.username
    }
	Actor.create({name:req.body.name, image:req.body.image,description:req.body.desc,author:author},function(err,actor){
		if(err){
			console.log(err);
		}
	});
	res.redirect("/actors");
});
// Edit actor
router.get("/:id/edit",checkOwner,function(req,res){
	Actor.findById(req.params.id,function(err,actor){
		if(!err){
			res.render("editact",{actor:actor});
		}
	})
		
})
router.put("/:id",checkOwner,function(req,res){
	Actor.findByIdAndUpdate(req.params.id,req.body.actor,function(err,actor){
		if(err){
			res.redirect("/actors");
		}
		else{
			res.redirect("/actors/"+req.params.id);
		}
	})
})
// Delete actor
router.delete("/:id/delete",checkOwner,function(req,res){
	Actor.findById(req.params.id,function(err,actor){
		if(err){
			console.log(err);
			res.redirect("/actors");
		}
		else{
			Comment.findByIdAndRemove(actor.comments.id,function(err){if(err){console.log(err)}});
			Actor.findByIdAndRemove(req.params.id,function(err){
				if(err){
					console.log(err);
				}
				else{
					res.redirect("/actors");
				}
			});
		}
	})
})
function checkOwner(req,res,next){
	if(req.isAuthenticated()){
		Actor.findById(req.params.id,function(err,actor){
			if(err){
				res.redirect("back");
			}
			else{
				if(actor.author.id.equals(req.user._id)){
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