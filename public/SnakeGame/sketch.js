// var blocksX = 160;
// var blocksY = 80;
var blocksX = 40;
// var blocksX = 16;
var blocksY = 20;

let maxBlocks = 1000;
// var blocksY = 8;
let blockSize;
let xOffset = 0;
let yOffset = 0;

let s;
let noDieMode = true;
let pause = false;

let speedMultiplier = 1;
let hc;
let outlineLength = 3;

let welcomeText;
let previousHeadPositions = [];

function preload() {
    welcomeText = loadImage("/SnakeGame/s/welcomeText.png");
}

function setup() {

    ////setupElements();
    window.canvas = createCanvas(windowWidth-18, windowHeight);
    canvas.position(0, 0);
    window.canvas.style('z-index', 1);
    setBlocks();
    blockize = min(width / blocksX, height / blocksY);
    outlineLength = blockSize / 15;
    xOffset = (width - blockSize * blocksX) / 2.0;
    yOffset = (height - blockSize * blocksY) / 2.0;

    s = new Snake();

    hc = new HamiltonianCycle(blocksX, blocksY);
    s.resetOnHamiltonian(hc.cycle);
    frameRate(30);


    // .touchStarted(onclick);


}

function setBlocks() {

    let testBlockSize = 1;
    while (true) {
        if (floor(canvas.width / testBlockSize) * floor(canvas.height / testBlockSize) < maxBlocks) {


            blockSize = testBlockSize;
            blocksX = floor(canvas.width / blockSize) - floor(canvas.width / blockSize) % 2;
            blocksY = floor(canvas.height / blockSize) - floor(canvas.height / blockSize) % 2;
            return;
        } else {
            testBlockSize++;
        }
    }


}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    blockSize = min(width / blocksX, height / blocksY);
    outlineLength = blockSize / 15;
    xOffset = (width - blockSize * blocksX) / 2.0;
    yOffset = (height - blockSize * blocksY) / 2.0;
    //onResize();
}


function draw() {
    if (!pause) {
        background(20);
        textAlign(CENTER, CENTER);
        fill(20);
        noStroke();
        textSize(100);
        if (canvas.width > 0) {

            let newImageWidth = canvas.width - 2 * xOffset;
            newImageWidth *= 0.9;
            let widthRatio = newImageWidth / welcomeText.width;
            let newImageHeight = welcomeText.height * widthRatio;
            image(welcomeText, canvas.width / 2 - newImageWidth / 2, canvas.height / 2 - newImageHeight / 2, newImageWidth, newImageHeight);
            fill(20, 100);
            rect(canvas.width / 2 - newImageWidth / 2, canvas.height / 2 - newImageHeight / 2, newImageWidth, newImageHeight)

        }

        fill(20);
        rect(0, 0, width, yOffset);
        rect(0, 0, xOffset, height);
        rect(width, height, -width, -yOffset);
        rect(width, height, -xOffset, -height);
       
        push();
        translate(xOffset, yOffset);

        fill(20);
        s.show();
        // hc.show();
        for (let i = 0; i < speedMultiplier; i++) {
            s.update();
        }
        pop();


    }
}



