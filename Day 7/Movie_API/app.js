// Movie API
var express = require("express");
var app=express();
var request = require("request"); 
app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",function(req,res){
	res.render("search");
})

app.get("/results",function(req,res){
	var mov=req.query.movie;
	var url="http://www.omdbapi.com/?apikey=thewdb&s="+mov;
	request(url,function(error,response,body){
		if(!error&&response.statusCode==200)
			{
				var data = JSON.parse(body);
				// res.send(results["Search"][0]["Title"]);
				res.render("results",{data: data});
			}
	})
	
})

app.listen(process.env.PORT||3000,process.env.IP,function(){
	console.log("Server started");
})