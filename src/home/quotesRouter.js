const express= require("express")
const router= express.Router();
const fs = require('fs');
const path = require('path')


const publicDirectoryPath = path.join(__dirname, '../../public')

let rawdata = fs.readFileSync(publicDirectoryPath+"/index/data/quotes.json");
let quotes= JSON.parse(rawdata);

//quote

router.get("/getQuote",(req,res)=>{
    num=Math.floor((Math.random() * quotes.length))
    res.send({"quote":quotes[num].text, "cite": quotes[num].from})
})




module.exports=router;