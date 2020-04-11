const events = require("events");

const emitter = new events.EventEmitter();

emitter.on("customEvent", (first , second) => {
    console.log(` ${second}: ${first}`);
})

// emitter.emit("coustomEvent", "Hello Wolrd", "computer");
// emitter.emit("coustomEvent", "Hi there", "Manoj")

process.stdin.on("data",data=>{
    const input = data.toString().trim();
    if(input === "exit"){
        emitter.emit("customEvent", "GoodeBye", "Terminal");
        process.exit();
    }
    emitter.emit("customEvent", input, "user");
})