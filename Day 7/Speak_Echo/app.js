// Animal Sounds
var express = require("express");
var app = express();

app.get("/",function(req,res){
	res.send("Hi there,welcome to my assignment!");
})

app.get("/speak/:animal",function(req,res){
	if(req.params.animal=="pig")
		{
			res.send("Oink");
		}
	else if(req.params.animal=="dog")
		{
			res.send("Woof Woof");
		}
	else if(req.params.animal=="cow")
		{
			res.send("MOO");
		}
	else if(req.params.animal=="cat")
		{
			res.send("Meow");
		}
	else if(req.params.animal=="goat")
		{
			res.send("baaaahhhhh");
		}
});

app.get("/repeat/:str/:num",function(req,res){
	var string =req.params.str+" ";
	for(var i=1;i<req.params.num;i++)
		{
			string=string+req.params.str+" ";
		}
	res.send(string);
})

app.get("*",function(req,res){
	res.send("Sorry page not found :(");
})

app.listen(process.env.PORT||3000,process.env.IP,function(){
	console.log("Server started");
})