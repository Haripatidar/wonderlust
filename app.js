const express= require("express");
const app=express();
const ejs= require("ejs");
const mongoose= require("mongoose");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

const port= 8080;
const Listing=require("./models/listing.js");   
const path = require("path");

app.set("view engine",'ejs');
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")))




MONGO_URL=mongodb="mongodb://127.0.0.1:27017/wonderlust"
main().then(()=>{
    console.log("connecting to db ");
})
.catch(err => console.log(err));

async function main(){
    await mongoose.connect(MONGO_URL);

};


app.get("/",(req,res)=>{
    res.send("hi i am root ");
});
//new route this route is use for add a new listing with the help of btn 

app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs"); 
});


//show route  this route is show full information of all listings 
app.get("/listings/:id",async(req , res)=>{
     let{id}=req.params;
    id = id.trim();
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});  

  });

//get route   this is index route for show all listings from database 
app.get("/listings",async(req, res )=>{
    // this is use to find all listings 
    const allListings=await Listing.find({});   
    res.render("listings/index.ejs",{allListings});
});

 


//create route  this is use to post  what we add in our new route on the listings page 

app.post("/listings",async(req,res)=>{
    // let {title,description,image,price,country,location}=req.body;
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});
    

//update route is to update the new value to old listing value 
app.put("/listings/:id",async(req,res)=>{
    let{id}=req.params;
    id = id.trim();
    await Listing.findByIdAndUpdate(id,{...req.body.Listing}); 
    res.redirect(`/listings/${id}`);

});


    //edit this is use to edit any listung 
app.get("/listings/:id/edit",async(req,res)=>{
    let{id}=req.params;
    id = id.trim();
    const listing=await Listing.findById(id); 
    res.render("listings/edit.ejs",{listing});
});


// delete route this route is use to delete the listing we want 
app.delete("/listings/:id",async(req,res)=>{
    let{id}=req.params;
    const deleted=await Listing.findByIdAndDelete(id);
    console.log(deleted);
    res.redirect("/listings");
});



    //new route this route is use for add a new listing with the help of btn 

    app.get("/listings/new",(req,res)=>{
        res.render("listings/new.ejs"); 
    });
    

// app.get("/testlistings",async(req,res)=>{
//      let sampleListing= new Listing({
//         title:"home",
//         description:"my sweet home",
//         price:1200,
//         country:"india",
//         location:"goa",


//      });
//      await sampleListing.save();
//      console.log("samplelisting was saved ");
//      res.send("successful");


// });

app.listen(8080,()=>{
    console.log(`app is listening on port ${port}`)
});

