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
router.get("/new",function(req,res){
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
router.post("/",function(req,res){
	Actor.create({name:req.body.name, image:req.body.image,description:req.body.desc},function(err,actor){
		if(err){
			console.log(err);
		}
	});
	res.redirect("/actors");
});

module.exports=router;