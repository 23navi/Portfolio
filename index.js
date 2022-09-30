if(process.env.NODE_ENV!== "production"){
    require('dotenv').config({ path: './config/dev.env' })
}


const express= require("express");
const path=require("path");

const count=require("./src/home/visitcount");
const randomImageUrl=require("./src/home/myImages");

const ejsMate = require('ejs-mate');

require("./src/allProjects/db/mongoose");
const session= require("express-session");
const MongoStore=require("connect-mongo");
const flash = require("connect-flash");

const app=express();

const PORT=process.env.PORT||3000;

const viewPath=path.join(__dirname,'./views');
const publicDirectoryPath = path.join(__dirname, './public')


app.use(express.urlencoded({extended:true})); //for post request 
app.set('view engine','ejs');
app.set('views',viewPath)
app.use(express.static(publicDirectoryPath))
app.engine('ejs', ejsMate);
app.use(express.json());




const store = MongoStore.create({
    mongoUrl: "mongodb+srv://navi:Navi2308@portfoliotest.ihv5hjx.mongodb.net/",
    // touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'squirrel'
    }
  });


app.use(session({
    secret:"key",
    cokkie:{maxAge:60000000},
    resave:false,
    saveUninitialized:false,
    store:store,
}))

app.use(flash());


let originalPath=""
app.use((req,res,next)=>{
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    originalPath= req.path;
    next();
})


const projectRouter=require("./src/allProjects/routers/allProjectRouter");
app.use(projectRouter)

const reviewRouter=require("./src/allProjects/routers/reviewRouter");
app.use(reviewRouter)

const contactRouter= require("./src/home/contactRouter");
app.use(contactRouter);

const quotesRouter= require("./src/home/quotesRouter");
app.use(quotesRouter);





app.get("/",(req,res)=>{
    res.locals.currentUser= req.session.user;
    let greets=["Bonjour","Namaste","Hola","Hello"]
    let pageVisitCount=count();
    res.render("index",{
        pageVisitCount,
        year:"4th",
        displayImage:Math.floor(Math.random() * 3),
        greet:greets[Math.floor(Math.random() * 4) ],
        imageUrl:randomImageUrl()
    });
})




app.get("/projects",(req,res)=>{
    res.render("project/project",{});
})





app.get("/resume",(req,res)=>{
    res.render("comingSoon",{title:"Resume"});
})



app.get("/moreAboutMe",(req,res)=>{
    res.render("comingSoon",{title:"About me"});
})


app.get("/snake",(req,res)=>{
    res.render("snake");
})






app.get("*",(req,res)=>{
    res.render("notFound",{route:originalPath})
})


app.listen(PORT,()=>{
    console.log("Server up and running on port "+PORT);

})



