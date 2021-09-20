const fs = require("fs")
let files = fs.readdirSync("./images")
console.log(JSON.stringify(files))