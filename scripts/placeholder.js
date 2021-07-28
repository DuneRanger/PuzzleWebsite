const fs = require("fs")
let files = fs.readdirSync("../images/puzzlePics")
console.log(JSON.stringify(files))