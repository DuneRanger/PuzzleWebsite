let files = ["Anomaly.jpg","Arctic fox.png","Astroworld.png","Ayaka.png","Cloud beast.png","Detailed1.jpg","Detailed2.jpg","Detailed3.jpg","Fallen Titan.png","Fireflies.jpg","Forest temple.jpg","Godwhale.jpg","Goldenwalk.jpg","Jungle Harbour.jpg","life death.jpg","lonely cruise.jpg","Misty forest.jpg","Mushroom Tree.jpg","Neon Samurai.jpg","North pole.jpg","Odyssey.jpg","Paranoid.jpg","Planet V_02.jpg","Portal.jpg","Portal.png","RDR2.jpg","Relaxing life.jpg","River side.jpg","Shores of Space.jpg","Soaring Roots.jpg","Supertree city.jpg","The horsemen.png","The journey of Elaina.jpg","The Mystery.jpg","Tree of Life.jpg","Twinflame.png","Void under rule.jpg","Winter wolf.png","Winter.png","Yaksha.png"];
let filesTEST = ["Anomaly.jpg","Astroworld.png","The horsemen.png","Godwhale.jpg"];
let Canvas, img, failedLoad = false;
let tiles = [];
let selected = [];
let locked = true;

let widthSlider = document.getElementById("gridWidth");
let gridWidth = widthSlider.value;

let heightSlider = document.getElementById("gridHeight");
let gridHeight = heightSlider.value;

let output = document.getElementById("puzzleSize");
let sliderValues = [widthSlider.value, heightSlider.value]

class imageTile {
    constructor(src, gridX, gridY, tileWidth, tileHeight, imgX, imgY) {
        this.src = src;
        this.width = tileWidth;
        this.height = tileHeight;
        this.gridX = gridX;
        this.gridY = gridY;
        this.imgX = imgX;
        this.imgY = imgY;
    }
    imgDraw() {
        let x = this.gridX*this.width;
        let y = this.gridY*this.height;
        image(this.src, x, y, x + this.width, y + this.height, this.imgX, this.imgY, this.width, this.height);
        //tried to make dynamic box colour
        // img.loadPixels();
        // console.log(img.pixels[4*(this.imgX + this.imgY*img.width)])
        // stroke(255 - img.pixels[4*(this.imgX + this.imgY*img.width)])
        // stroke(150)
        rect(x, y, x + this.width, y + this.height);
    }
}

function setup() {
    Canvas = createCanvas(innerWidth*0.8, innerHeight*0.8);
    Canvas.parent("canvas");
    img = loadImage(getRandomImage(files));
    resizeImgCanvas(img);
    imageMode(CORNERS);
    noFill();
    strokeWeight(1)
    rectMode(CORNERS);
    textSize(32);
    textAlign(CENTER);
    noLoop();
}

function draw() {
    output.innerHTML = "Puzzle width: " + sliderValues[0] + "\t|\t|\tPuzzle height: " + sliderValues[1];
    background(150)
    if (failedLoad) {
        push();
        fill(0);
        resizeImgCanvas({"width": 300, "height": 300});
        text("Failed to load image", Canvas.width/2, Canvas.height/2);
        pop();
    }
    else {
        tiles.forEach(v => v.forEach(i => i.imgDraw()))
        console.log("test")
    }
}

function getRandomImage(src) { 
    let randomInd = Math.ceil(Math.random()*src.length-1);
    return "./images/" + src[randomInd];
}

function resizeImgCanvas() {
    img.height *= 1.5;
    img.width *= 1.5;
    while(img.height > innerHeight*0.75 || img.width > innerWidth*0.8) {
        img.width *= 0.9;
        img.height *= 0.9;
    }
    resizeCanvas(img.width, img.height);
}

function prepareImage() {
    img = loadImage(getRandomImage(files), () => {
        //resizeImgCanvas ends up doing redraw(), but the tiles aren't created yet, so it doesn't display the image
        //But for some reason, having createTiles() and redraw() happen in newPuzzle.onclick doesnt' work... :/
        resizeImgCanvas();
        createTiles();
        redraw();
        failedLoad = false;
    }, () => {
        failedLoad = true;
    });
}

function swapTiles(tile1, tile2) {
    
    //Made to not let temp be a reference to tile1
    let temp = [tile1.gridX, tile1.gridY];
    tile1.gridX = tile2.gridX
    tile1.gridY = tile2.gridY
    tile2.gridX = temp[0]
    tile2.gridY = temp[1]
}

function createTiles() {
    tiles = [];
    //Divided into rows, purely for easier array reading
    let tempRow = [];
    let tileWidth = img.width/gridWidth
    let tileHeight = img.height/gridHeight

    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            tempRow.push(new imageTile(img, x, y, tileWidth, tileHeight, x*tileWidth, y*tileHeight))
        }
        tiles.push(tempRow)
        tempRow = []
    }
}

newPuzzle.onclick = function() {
    prepareImage();
}

widthSlider.oninput = function() {
    sliderValues[0] = this.value
    gridWidth = this.value;
    if (locked) {
        heightSlider.value = this.value
        sliderValues[1] = this.value
        gridHeight = this.value;
    }
    createTiles();
    redraw();
}


heightSlider.oninput = function() {
    sliderValues[1] = this.value
    gridHeight = this.value;
    if (locked) {
        widthSlider.value = this.value
        sliderValues[0] = this.value
        gridWidth = this.value;
    }
    createTiles();
    redraw();
}

function mousePressed() {
    if (mouseX > 0 && mouseX < img.width && mouseY > 0 && mouseY < img.height) {
        //Gets the grid coordinates for mouseX and Y
        let mouseGridX = Math.floor(mouseX/(img.width/gridWidth))
        let mouseGridY = Math.floor(mouseY/(img.height/gridHeight))
        selected.push([mouseGridY, mouseGridX])
        if (selected.length > 1) {
            swapTiles(tiles[selected[0][0]][selected[0][1]], tiles[selected[1][0]][selected[1][1]])
            selected = []
            redraw();
        }
    }
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