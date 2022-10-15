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
var methodOverride = require('method-override')


const cluster= require("cluster")
const os= require("os")



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
app.use(methodOverride('_method'))




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



app.get('/mysongs', (req, res) => {
    res.sendFile(`${publicDirectoryPath}/musicPlayer/index.html`);
  });






app.get("/projects",(req,res)=>{
    res.render("project/project",{});
})





app.get("/resume",(req,res)=>{
    res.render("comingSoon",{title:"Resume"});
})



app.get("/moreAboutMe",(req,res)=>{
    res.render("comingSoon",{title:"About me"});
})

//render the snake game project ... move to project route
app.get("/snake",(req,res)=>{
    res.render("snake");
})


app.get("*",(req,res)=>{
    res.render("notFound",{route:originalPath})
})


if(cluster.isMaster){
    console.log("Master started with Pid of master: "+process.pid)
    const num_of_cpus= os.cpus().length
    for(let i=0;i<num_of_cpus;i++){
      cluster.fork();
    }
  }else{
    console.log("worker started with pid: "+process.pid);
    app.listen(PORT,()=>{
        console.log("listning to port "+ PORT)
    });
  }


