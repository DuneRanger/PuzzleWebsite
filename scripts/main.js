let files = ["Anomaly.jpg","Arctic fox.png","Astroworld.png","Ayaka.png","Cloud beast.png","Detailed1.jpg","Detailed2.jpg","Detailed3.jpg","Fallen Titan.png","Fireflies.jpg","Forest temple.jpg","Godwhale.jpg","Goldenwalk.jpg","Jungle Harbour.jpg","life death.jpg","lonely cruise.jpg","Misty forest.jpg","Mushroom Tree.jpg","Neon Samurai.jpg","North pole.jpg","Odyssey.jpg","Paranoid.jpg","Planet V_02.jpg","Portal.jpg","Portal.png","RDR2.jpg","Relaxing life.jpg","River side.jpg","Shores of Space.jpg","Soaring Roots.jpg","Supertree city.jpg","The horsemen.png","The journey of Elaina.jpg","The Mystery.jpg","Tree of Life.jpg","Twinflame.png","Void under rule.jpg","Winter wolf.png","Winter.png","Yaksha.png"];
let filesTEST = ["Anomaly.jpg","Astroworld.png","The horsemen.png","Godwhale.jpg"];
let Canvas, img, failedLoad = false;
let tiles = [];

let slider = document.getElementById("gridSize");
let output = document.getElementById("sliderVal");
let gridSize = slider.value;
output.innerHTML = "Puzzle pieces: " + slider.value**2;

class imageTile {
    constructor(src, tile_X, tile_Y, tileWidth, tileHeight) {
        this.src = src;
        this.width = tileWidth;
        this.height = tileHeight;
        this.x = tile_X;
        this.y = tile_Y;
    }
    imgDraw() {
        image(this.src, this.x, this.y, this.x + this.width, this.y + this.height, this.x, this.y, this.width, this.height)
        rect(this.x, this.y, this.x + this.width, this.y + this.height)
    }
}

function setup() {
    Canvas = createCanvas(innerWidth*0.8, innerHeight*0.8);
    Canvas.parent("canvas");
    img = loadImage(getRandomImage(files));
    resizeImgCanvas(img);
    imageMode(CORNERS);
    noFill();
    rectMode(CORNERS);
    textSize(32);
    textAlign(CENTER);
    noLoop();
}

function draw() {
    background(150)
    if (failedLoad) {
        push();
        fill(0);
        resizeImgCanvas({"width": 300, "height": 300});
        text("Failed to load image", Canvas.width/2, Canvas.height/2);
        pop();
    }
    else createTiles(img, gridSize)
}

function getRandomImage(src) { 
    let randomInd = Math.ceil(Math.random()*src.length-1);
    return "./images/" + src[randomInd];
}

function resizeImgCanvas(img) {
    img.height *= 1.5;
    img.width *= 1.5;
    while(img.height > innerHeight*0.85 || img.width > innerWidth*0.8) {
        img.width *= 0.9;
        img.height *= 0.9;
    }
    resizeCanvas(img.width, img.height);
}

function prepareImage() {
    img = loadImage(getRandomImage(files), img => {
        resizeImgCanvas(img);
        failedLoad = false;
        createTiles(img, gridSize)
    }, () => {
        failedLoad = true;
    });
}

function createTiles(img, gridSize) {
    tiles = [];
    let tempRow = [];
    let tileWidth = img.width/gridSize
    let tileHeight = img.height/gridSize

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            tiles.push(new imageTile(img, x*tileWidth, y*tileHeight, tileWidth, tileHeight))
        }
        // tiles.push(tempRow)
    }
    for (i in tiles) tiles[i].imgDraw();
}

newPuzzle.onclick = function() {
    prepareImage()
    redraw();
}

slider.oninput = function() {
    output.innerHTML = "Puzzle pieces: " + this.value**2;
    gridSize = this.value;
    redraw();
}

// fileInput.addEventListener("input", (img) => {
    // img = loadImage(img.target.files[0].path, img => {
    //     resizeImgCanvas(img)
    //     failedLoad = false
    // }, () => {
    //     failedLoad = true
    // })
    // console.log(img)
// })
// Custom images put on hold because browser security issues are a valid concern and not worth circumventing