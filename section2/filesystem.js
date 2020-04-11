const fs = require("fs");
// fs.writeFileSync("notes.txt", "filesystem.js");

fs.appendFileSync("notes.txt", " It was appended");
