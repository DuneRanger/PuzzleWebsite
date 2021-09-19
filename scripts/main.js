let files = ["Anomaly.jpg","Arctic fox.png","Astroworld.png","Ayaka.png","Cloud beast.png","Detailed1.jpg","Detailed2.jpg","Detailed3.jpg","Fallen Titan.png","Fireflies.jpg","Forest temple.jpg","Godwhale.jpg","Goldenwalk.jpg","Jungle Harbour.jpg","life death.jpg","lonely cruise.jpg","Misty forest.jpg","Mushroom Tree.jpg","Neon Samurai.jpg","North pole.jpg","Odyssey.jpg","Paranoid.jpg","Planet V_02.jpg","Portal.jpg","Portal.png","RDR2.jpg","Relaxing life.jpg","River side.jpg","Shores of Space.jpg","Soaring Roots.jpg","Supertree city.jpg","The horsemen.png","The journey of Elaina.jpg","The Mystery.jpg","Tree of Life.jpg","Twinflame.png","Void under rule.jpg","Winter wolf.png","Winter.png","Yaksha.png"];
let filesTEST = ["Anomaly.jpg","Detailed1.jpg","The horsemen.png","Godwhale.jpg"];
let Canvas, img;

function setup() {
    Canvas = createCanvas(innerWidth*0.8, innerHeight*0.8);
    img = loadImage(getRandomImage(files))
    resizeImgCanvas(img)
    imageMode(CORNERS)
    Canvas.parent("canvas")
}

function draw() {
    fill(200)
    rect(0, 0, Canvas.width, Canvas.height)
    image(img, 0, 0, Canvas.width, Canvas.height)
}

function getRandomImage(src) { 
    let randomInd = Math.ceil(Math.random()*src.length-1);
    return "./images/puzzlePics/" + src[randomInd];
}

function resizeImgCanvas(img) {
    img.height *= 1.5
    img.width *= 1.5
    while(img.height > innerHeight*0.85 || img.width > innerWidth*0.8) {
        img.width *= 0.9
        img.height *= 0.9
    }
    resizeCanvas(img.width, img.height)
}

newPuzzle.onclick = function() {
    img = loadImage(getRandomImage(files), img => {
        resizeImgCanvas(img)
    })
}