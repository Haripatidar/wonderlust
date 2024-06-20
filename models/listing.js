const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema= new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    Image :{
        type:String,
        default:"https://images.pexels.com/photos/533769/pexels-photo-533769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        set : (v)=> v===""? "https://images.pexels.com/photos/533769/pexels-photo-533769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" : v,

    
    } ,
    price:Number ,
    location : String,
    country:String,
})

const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;