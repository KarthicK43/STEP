var mongoose=require("mongoose");
var actorSchema= new mongoose.Schema({
	name : String,
	image :String,
    description : String,
    author:{
            id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"user"
            },
            username:String
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }
    ]
});
module.exports=mongoose.model("actor",actorSchema)