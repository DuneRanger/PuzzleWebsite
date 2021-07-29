let files = ["Anomaly.jpg","Arctic fox.png","Astroworld.png","Ayaka.png","Cloud beast.png","Detailed1.jpg","Detailed2.jpg","Detailed3.jpg","Fallen Titan.png","Fireflies.jpg","Forest temple.jpg","Godwhale.jpg","Goldenwalk.jpg","Jungle Harbour.jpg","life death.jpg","lonely cruise.jpg","Misty forest.jpg","Mushroom Tree.jpg","Neon Samurai.jpg","North pole.jpg","Odyssey.jpg","Paranoid.jpg","Planet V_02.jpg","Portal.jpg","Portal.png","RDR2.jpg","Relaxing life.jpg","River side.jpg","Shores of Space.jpg","Soaring Roots.jpg","Supertree city.jpg","The horsemen.png","The journey of Elaina.jpg","The Mystery.jpg","Tree of Life.jpg","Twinflame.png","Void under rule.jpg","Winter wolf.png","Winter.png","Yaksha.png"];
let filesTEST = ["Anomaly.jpg","Detailed1.jpg","The horsemen.png","Void under rule.jpg"];

const newPuzzle = document.getElementById("newPuzzle");
const main = document.getElementById("main");
const disclaimer = document.getElementById("disclaimer");
const puzzle = document.getElementById("puzzle");
disclaimer.setAttribute("textContent", "NOTE: I do not own any of these images and this site is not intended for commercial use");
puzzle.setAttribute("alt", "An error has probably occured whilst loading this image");

function getRandomImage(src) { 
    let randomInd = Math.ceil(Math.random()*src.length-1);
    return "./images/puzzlePics/" + src[randomInd];
}


function resizeImage(img) {
    let test = new Image();
    test.onload = function() {
        // console.log(this.width + "x" + this.height);
        let newW, newH;
        img.width = test.width;
        img.height = test.height;

        do {
            // Calculates ratio of image to window width | height and adjusts resolution accordingly
            newW = innerWidth/img.width *0.8;
            newH = innerHeight/img.height *0.8;
            puzzle.setAttribute("height", img.height * Math.min(newW, newH));
            puzzle.setAttribute("width", img.width * Math.min(newW, newH));
            // console.log("w, h:" + img.width*newW + "x" + img.height*newH);
            // console.log("img:" + img.width + "x" + img.height);
        } while (img.width > innerWidth || img.height > innerHeight);
    }
    test.src = img.src;
}


newPuzzle.onclick = function() {
    puzzle.setAttribute('src', getRandomImage(files));
    resizeImage(puzzle);
}

//To update bundle.js, use this:
//Doesn't work for some fucking weird reason
//browserify -t brfs main.js > bundle.j