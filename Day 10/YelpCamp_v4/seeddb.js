var mongoose=require("mongoose");
var Actor=require("./models/actors");
var Comment=require("./models/comments")
var actors=[
	{name:"Robert Downey Jr",image:"https://www.cheatsheet.com/wp-content/uploads/2020/03/Robert-Downey-Jr-3.jpg",description:"He acted as Iron man in marvel movies"},
	{name:"Dwayne Johnson",image:"https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBYFJHW.img?h=0&w=720&m=6&q=60&u=t&o=f&l=f&x=350&y=163",description:"He is a well known actor"},
	{name:"Leonardo DiCaprio",image:"https://www.telegraph.co.uk/content/dam/films/2018/09/21/TELEMMGLPICT000027014340_trans%2B%2BM37qcIWR9CtrqmiMdQVx7HKcsGtiuU_lafizKj4PQO0.jpeg",description:"He is a very good actor"}
]
function seedDB(){
    Actor.deleteMany({},function(err){
        if(err){
            console.log(err);
        }
        else{
            actors.forEach(function(actor){
                Actor.create(actor,function(err,data){
                    if(err){
                        console.log(err);
                    }
                    
                })
            })
        }
    })
}
module.exports=seedDB;