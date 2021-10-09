let files = ["Anomaly.jpg","Arctic fox.png","Astroworld.png","Ayaka.png","Cloud beast.png","Detailed1.jpg","Detailed2.jpg","Detailed3.jpg","Fallen Titan.png","Fireflies.jpg","Forest temple.jpg","Godwhale.jpg","Goldenwalk.jpg","Jungle Harbour.jpg","life death.jpg","lonely cruise.jpg","Misty forest.jpg","Mushroom Tree.jpg","Neon Samurai.jpg","North pole.jpg","Odyssey.jpg","Paranoid.jpg","Planet V_02.jpg","Portal.jpg","Portal.png","RDR2.jpg","Relaxing life.jpg","River side.jpg","Shores of Space.jpg","Soaring Roots.jpg","Supertree city.jpg","The horsemen.png","The journey of Elaina.jpg","The Mystery.jpg","Tree of Life.jpg","Twinflame.png","Void under rule.jpg","Winter wolf.png","Winter.png","Yaksha.png"];
let filesTEST = ["Anomaly.jpg","Astroworld.png","The horsemen.png","Godwhale.jpg"];
let Canvas, img, failedLoad = false;
let gridSize = 3

function setup() {
    Canvas = createCanvas(innerWidth*0.8, innerHeight*0.8);
    img = loadImage(getRandomImage(files));
    resizeImgCanvas(img);
    imageMode(CORNERS);
    Canvas.parent("canvas");
    textSize(32);
    textAlign(CENTER);
}

function draw() {

}

function loadImgGetPixels(origSize) {
    // background(150)
    if (failedLoad) {
        push();
        fill(0);
        resizeImgCanvas({"width": 300, "height": 300});
        text("Failed to load image", Canvas.width/2, Canvas.height/2);
        pop();
    }
    image(img, 0, 0, Canvas.width, Canvas.height);
    loadPixels();
    let pixelWidth = img.width/gridSize*8
    let pixelHeight = img.height/gridSize*2
    // console.log(img.height + "\n" + pixelHeight)
    let arr = [];
    for (let z = 0; z < gridSize; z++) {
        let asd = []
        for (let x = pixelHeight*z; x < pixelHeight*(z+1); x++) {
            for (let ind = pixelWidth*0; ind < pixelWidth; ind++) pixels[ind + img.width*8*x] = z*100;
            asd.push(x)
        }
        arr.push(asd)
    }
    console.log(arr)
    console.log(pixels.length)
    updatePixels();
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

function imageDivider(width, height, pixels) {

}

newPuzzle.onclick = function() {
    img = loadImage(getRandomImage(files), img => {
        let origSize = [img.width, img.height]
        resizeImgCanvas(img);
        failedLoad = false;
        loadImgGetPixels(origSize);
    }, () => {
        failedLoad = true;
    });
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