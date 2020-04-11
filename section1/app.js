const counter = require("./myModule");

counter.inc();
counter.inc();
counter.inc();
counter.inc();

counter.dec();
counter.dec();
counter.dec();
counter.dec();
counter.dec();
counter.dec();


console.log(counter.getCount());
