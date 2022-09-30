const path = require('path')
const {readFileSync,writeFileSync} = require("fs")

const publicDirectoryPath = path.join(__dirname, '../../public')


const newCount=()=>{

    let count=readFileSync(publicDirectoryPath+"/index/data/c.txt")
    count=parseInt(count)
    let newC=(count)+1
    writeFileSync(publicDirectoryPath+"/index/data/c.txt",newC.toString())
    return count;
}

module.exports=newCount;