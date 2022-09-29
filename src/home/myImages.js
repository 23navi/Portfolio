let imageUrl=[
    "https://res.cloudinary.com/drfaohzpo/image/upload/v1663834958/portfolio/myImages/2_rbsliy.png",
    "https://res.cloudinary.com/drfaohzpo/image/upload/v1663834932/portfolio/myImages/1_ekvxsg.jpg",
    "https://res.cloudinary.com/drfaohzpo/image/upload/v1663834931/portfolio/myImages/0_xorzay.jpg"
]

function randomImageUrl(){
    let item = imageUrl[Math.floor(Math.random()*imageUrl.length)];
    return item;
}

module.exports=randomImageUrl;