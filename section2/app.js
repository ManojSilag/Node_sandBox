const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

//create add
yargs.command({
  command: "add",
  describe: "Add a new node",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNotes(argv.title, argv.body);
  },
});

//create remove
yargs.command({
  command: "remove",
  describe: "remove a node",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.removeNotes(argv.title);
  },
});

//create list
yargs.command({
  command: "list",
  describe: "list a node",
  handler: function () {
    notes.listNotes();
  },
});

//create read
yargs.command({
  command: "read",
  describe: "read a node",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.readNote(argv.title);
  },
});

yargs.parse();
// console.log(yargs.argv);
