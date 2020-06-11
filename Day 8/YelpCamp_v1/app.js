// yelp version 1
var express = require("express");
var app=express();
var request = require("request"); 
var bodyParser=require("body-parser");
app.set("view engine","ejs");
var actors=[
	{name:"Robert Downey Jr",image:"https://www.cheatsheet.com/wp-content/uploads/2020/03/Robert-Downey-Jr-3.jpg"},
	{name:"Dwayne Johnson",image:"https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBYFJHW.img?h=0&w=720&m=6&q=60&u=t&o=f&l=f&x=350&y=163"},
	{name:"Leonardo DiCaprio",image:"https://www.telegraph.co.uk/content/dam/films/2018/09/21/TELEMMGLPICT000027014340_trans%2B%2BM37qcIWR9CtrqmiMdQVx7HKcsGtiuU_lafizKj4PQO0.jpeg"}
]
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
	res.render("home");
})

app.get("/actors",function(req,res){
	res.render("actors",{actors:actors});
})

app.get("/actors/new",function(req,res){
	res.render("newactor");
})
app.post("/actors",function(req,res){
	actors.push({name:req.body.name, image:req.body.image});
	res.redirect("/actors");
})



app.listen(process.env.PORT,process.env.IP,function(){
	console.log("Server started");
})