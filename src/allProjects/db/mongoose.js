const mongoose=require("mongoose");

//mongoose
//change the server name based on the project or user the dev.env for it

const dbName="projectsTest";

// mongoose.connect("mongodb://127.0.0.1:27017/"+dbName,{useNewUrlParser: true})
mongoose.connect(process.env.MONGODB_SERVER,{useNewUrlParser: true})
.then(()=>{
    console.log("connection open");
})
.catch(err=>{
    console.log("error on connection to the database");
})
