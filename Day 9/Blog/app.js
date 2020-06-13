var express=require("express"),
    mongoose=require("mongoose"),
    bodyParser=require("body-parser");
    methodOverride=require("method-override")
var app=express();
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost:27017/blog_app",{useNewUrlParser:true,useUnifiedTopology:true});

var blogSchema=new mongoose.Schema({
    name:String,
    image:String,
    body:String,
    created:{type:Date,default:Date.now}
})

var Blog=new mongoose.model("blog",blogSchema);

app.get("/",function(req,res){
    res.redirect("/blogs")
})

app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{blogs:blogs})
        }
    })
})

app.get("/blogs/new",function(req,res){
    res.render("new");
})

app.post("/blogs",function(req,res){
    Blog.create(req.body.blog,function(err,blog){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/blogs");
        }
    })
})

app.get("/show/:id",function(req,res){
    Blog.findById(req.params.id,function(err,blog){
        if(err){
            res.render("/blogs");
        }
        else{
            res.render("shows",{blog:blog});
        }
    })
})

app.get("/blogs/:id/edit",function(req,res){
    Blog.findById(req.params.id,function(err,blog){
        if(err){
            console.log(err)
        }
        else{
            res.render("edit",{blog:blog});
        }
    })
})

app.put("/shows/:id",function(req,res){
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,blog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/show/"+req.params.id)
        }
    })
})

app.delete("/blogs/:id",function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs");
        }
    })
})

app.listen(process.env.PORT||3000,process.env.IP,function(){
    console.log("Server Started");
})
