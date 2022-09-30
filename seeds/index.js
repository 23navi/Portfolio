const mongoose = require('mongoose');
const { places, descriptors } = require('./seedHelpers'); // we exported 2 module.exports... it came as obj
const Project = require('../src/allProjects/models/projectModel');



mongoose.connect("mongodb+srv://navi:Navi2308@portfoliotest.ihv5hjx.mongodb.net/projectsTest?retryWrites=true&w=majority",{useNewUrlParser: true})
.then(()=>{
    console.log("connection open");
    seedDB();

})
.catch(err=>{
    console.log("error on connection to the database");
})


// //a function which will take in an array and give one element of it from the array
const sample = (array_input) => array_input[Math.floor(Math.random() * array_input.length)];


const seedDB = async () => {
    await Project.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Project({

            
            name: `surat`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/drfaohzpo/image/upload/v1661588557/YelpCamp/ieltintdmvpkeitvcjlj.jpg',
                  
                },
                {
                  url: 'https://res.cloudinary.com/drfaohzpo/image/upload/v1661588560/YelpCamp/mtwaaytyf0cydcfs3hrs.png',
                  
                }
              ],
            descriptionMain: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            descriptionBasic: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            projectEnd:"20 Sept 2000",
            projectStart:"20 Sept 2984",
            tags:["one","two","three"]
        })
        await camp.save();
    }
    console.log("Seeded new Data")
}









const project = new Project({

            
  name: `snake`,
  title: `AI based snake maze solver`,
  images: [
      {
        url: 'images/aa.gif',
      }
    ],
  descriptionMain: '',
  descriptionBasic: '',
  projectEnd:"Ongoing",
  projectStart:"20 Sept 2020",
  tags:["P5.js","AI/ML"]
})
await project.save();