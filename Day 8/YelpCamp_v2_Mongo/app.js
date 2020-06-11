// yelp version 2
var express = require("express");
var app=express();
var request = require("request"); 
var bodyParser=require("body-parser");
var mongoose= require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true,useUnifiedTopology:true});
app.set("view engine","ejs");
var actorSchema= new mongoose.Schema({
	name : String,
	image :String,
	description : String
});

var Actor = mongoose.model("actor",actorSchema);
// Actor.create({name:"Leonardo DiCaprio",image:"https://www.telegraph.co.uk/content/dam/films/2018/09/21/TELEMMGLPICT000027014340_trans%2B%2BM37qcIWR9CtrqmiMdQVx7HKcsGtiuU_lafizKj4PQO0.jpeg"},function(err,actor){
// 	if(err){
// 		console.log(err);
// 	}
// 	else
// 		{
// 			console.log("done");
// 		}
// });
// var actors=[
// 	{name:"Robert Downey Jr",image:"https://www.cheatsheet.com/wp-content/uploads/2020/03/Robert-Downey-Jr-3.jpg"},
// 	{name:"Dwayne Johnson",image:"https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBYFJHW.img?h=0&w=720&m=6&q=60&u=t&o=f&l=f&x=350&y=163"},
// 	{name:"Leonardo DiCaprio",image:"https://www.telegraph.co.uk/content/dam/films/2018/09/21/TELEMMGLPICT000027014340_trans%2B%2BM37qcIWR9CtrqmiMdQVx7HKcsGtiuU_lafizKj4PQO0.jpeg"}
// ]
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
	res.render("home");
})

app.get("/actors",function(req,res){
	Actor.find({},function(err,actors){
			   if(err){
				   console.log(err);
			   }
				else{
					res.render("actors",{actors:actors});
				}
			   })
})

app.get("/actors/new",function(req,res){
	res.render("newactor");
})
app.get("/actors/:id",function(req,res){
	Actor.findById(req.params.id,function(err,actor){
		if(err){
			console.log(err);
		}
		else{
			res.render("descact",{actor:actor});
		}
	})
})
app.post("/actors",function(req,res){
	Actor.create({name:req.body.name, image:req.body.image,description:req.body.desc},function(err,actor){
		if(err){
			console.log(err);
		}
	});
	res.redirect("/actors");
})



app.listen(process.env.PORT||3000,process.env.IP,function(){
	console.log("Server started");
})