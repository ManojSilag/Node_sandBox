const path = require("path");
// console.log(path);
const util = require("util");
const v8 = require("v8");

// const durUploads = path.join(__dirname, 'www', 'files', 'uploads');
// console.log(durUploads);

util.log(path.basename(__filename));

util.log(v8.getHeapSnapshot());
