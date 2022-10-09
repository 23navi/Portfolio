const mongoose = require('mongoose');
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


    const project1 = new Project({

      name: `snake`,
      title: `AI based snake maze solver`,
      images: [
          {
            url: '/images/projects/snake.gif',
          }
        ],
      descriptionMain: '',
      descriptionBasic: '',
      projectEnd:"Ongoing",
      projectStart:"20 Sept 2020",
      tags:["P5.js","AI/ML"]
    })
    await project1.save();
    

    const project2 = new Project({      
      name: `cloudseed`,
      title: `Cloud Seeding using Rockets`,
      images: [
          {
            url: '/images/projects/rocket.gif',
          }
        ],
      descriptionMain: 'Rocket Science?',
      descriptionBasic: '',
      projectEnd:"Ongoing",
      projectStart:"20 Sept 2020",
      tags:["Hardware","PyroChem"]
    })
    await project2.save();
    
    
   
    
    
    
    const project3 = new Project({   
      name: `weatherApp`,
      title: `Weather forcasting app using API`,
      images: [
          {
            url: '/images/projects/workingOnIt.gif',
          }
        ],
      descriptionMain: 'The most common node.js starter project. It\'s lile a Hello World program for node.js :)',
      descriptionBasic: '',
      projectEnd:"Ongoing",
      projectStart:"20 Sept 2020",
      tags:["node.js","API","express"]
    })
    await project3.save();
    
    
    
    const project4 = new Project({      
      name: `vitbus`,
      title: `VIT bus service system`,
      images: [
          {
            url: '/images/projects/workingOnIt.gif',
          }
        ],
      descriptionMain: 'Created a mobile application which can track the bus and also manage offline payments for bus in VIT using RFID running on Arduino',
      descriptionBasic: '',
      projectEnd:"Ongoing",
      projectStart:"20 Sept 2020",
      tags:["Arduino"]
    })
    await project4.save();
    
    
    
    const project5 = new Project({      
      name: `sin`,
      title: `Synt Information Classifier`,
      images: [
          {
            url: '/images/projects/workingOnIt.gif',
          }
        ],
      descriptionMain: 'A application which can auto scan your news and classify them',
      descriptionBasic: '',
      projectEnd:"Ongoing",
      projectStart:"20 Sept 2020",
      tags:["NLP","AI/ML"]
    })
    await project5.save();
    


    const project6 = new Project({
      
      name: `visualization`,
      title: `Visualization of popular DSA Algos`,
      images: [
          {
            url: '/images/projects/workingOnIt.gif',
          }
        ],
      descriptionMain: 'Includes spanning tree using prims algo, ',
      descriptionBasic: '',
      projectEnd:"Ongoing",
      projectStart:"20 Sept 2020",
      tags:["P5.js","DSA"]
    })
    await project2.save();
    
    


    const project7 = new Project({      
      name: `quotes`,
      title: `An API endpoint which returns random quotes`,
      images: [
          {
            url: '/images/projects/workingOnIt.gif',
          }
        ],
      descriptionMain: 'I know it\'s not some high tech project but it was one of the first time I contributed to an open source project and used the same to create this API endpoint. Fun Fact: I have used the same API in my home page to show random quote. And you can too access the API endpoint at thissite/getQuote',
      descriptionBasic: '',
      projectEnd:"Ongoing",
      projectStart:"20 Sept 2020",
      tags:["Node-API"]
    })
    await project7.save();
    
    
    
    
    
    console.log("Seeded new Data")
}









// const project1 = new Project({

//   name: `snake`,
//   title: `AI based snake maze solver`,
//   images: [
//       {
//         url: 'images/snake.gif',
//       }
//     ],
//   descriptionMain: '',
//   descriptionBasic: '',
//   projectEnd:"Ongoing",
//   projectStart:"20 Sept 2020",
//   tags:["P5.js","AI/ML"]
// })
// await project1.save();



// const project2 = new Project({
  
//   name: `visualization`,
//   title: `Visualization of popular DSA Algos`,
//   images: [
//       {
//         url: 'images/snake.gif',
//       }
//     ],
//   descriptionMain: 'Includes spanning tree using prims algo, ',
//   descriptionBasic: '',
//   projectEnd:"Ongoing",
//   projectStart:"20 Sept 2020",
//   tags:["P5.js","DSA"]
// })
// await project2.save();





// const project3 = new Project({   
//   name: `weatherApp`,
//   title: `Weather forcasting app using API`,
//   images: [
//       {
//         url: 'images/snake.gif',
//       }
//     ],
//   descriptionMain: 'The most common node.js starter project. It\'s lile a Hello World program for node.js :)',
//   descriptionBasic: '',
//   projectEnd:"Ongoing",
//   projectStart:"20 Sept 2020",
//   tags:["node.js","API","express"]
// })
// await project3.save();



// const project4 = new Project({      
//   name: `vitbus`,
//   title: `VIT bus service system`,
//   images: [
//       {
//         url: 'images/snake.gif',
//       }
//     ],
//   descriptionMain: 'Created a mobile application which can track the bus and also manage offline payments for bus in VIT using RFID running on Arduino',
//   descriptionBasic: '',
//   projectEnd:"Ongoing",
//   projectStart:"20 Sept 2020",
//   tags:["Arduino"]
// })
// await project4.save();



// const project5 = new Project({      
//   name: `sin`,
//   title: `Synt Information Classifier`,
//   images: [
//       {
//         url: 'images/snake.gif',
//       }
//     ],
//   descriptionMain: 'A application which can auto scan your news and classify them',
//   descriptionBasic: '',
//   projectEnd:"Ongoing",
//   projectStart:"20 Sept 2020",
//   tags:["NLP","AI/ML"]
// })
// await project5.save();



// const project6 = new Project({      
//   name: `cloudseed`,
//   title: `Cloud Seeding using Rockets`,
//   images: [
//       {
//         url: 'images/snake.gif',
//       }
//     ],
//   descriptionMain: 'Rocket Science?',
//   descriptionBasic: '',
//   projectEnd:"Ongoing",
//   projectStart:"20 Sept 2020",
//   tags:["Hardware","PyroChem"]
// })
// await project6.save();



// //
