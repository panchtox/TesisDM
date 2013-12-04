fs = require("fs");
var stream = fs.createWriteStream("file.txt");
stream.on("open", function() {
// write to and close the stream at the same time
stream.end(("coso loco 1"), "utf-8");
});