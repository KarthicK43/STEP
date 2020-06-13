// yelp version 4
var express = require("express");
var app=express();
var request = require("request"); 
var bodyParser=require("body-parser");
var mongoose= require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local")
var methodOverride=require("method-override");
// models
var Actor = require("./models/actors");
var Comment = require("./models/comments");
var User = require("./models/user")
var seed=require("./seeddb");
// routes
var  commentRoutes=require("./routes/comments");
var mainRoutes=require("./routes/main");
var authRoutes=require("./routes/auth");
// configs
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"))
var sessionE = require("express-session")({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
});

// passport config
app.use(sessionE);
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
// header assign
app.use(function(req,res,next){
	res.locals.curuser=req.user;
	next();
})
// 
app.use(methodOverride("_method"));
app.use("/actors/:id/comments",commentRoutes);
app.use("/actors",mainRoutes);
app.use(authRoutes);

// home
app.get("/",function(req,res){
	res.render("home");
})
// seed();
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
app.listen(process.env.PORT||3000,process.env.IP,function(){
	console.log("Server started");
})