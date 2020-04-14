const fs = require("fs");
const chalk = require("chalk");

const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({ title: title, body: body });
    saveNote(notes);
    console.log(chalk.green.inverse("Note added"));
  } else {
    console.log(chalk.red.inverse("Duplicate Note"));
  }
};

const removeNotes = (title) => {
  const notes = loadNotes();
  const newNoteList = notes.filter((data) => {
    return data.title !== title;
  });
  // console.log(newNoteList);
  if (JSON.stringify(notes) === JSON.stringify(newNoteList)) {
    console.log(chalk.red.inverse("Note not found....."));
  } else {
    saveNote(newNoteList);
    console.log(chalk.green.inverse("Note removed....."));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  notes.forEach((note) => {
    console.log(chalk.grey("Title:", note.title));
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const Note = notes.find((note) => note.title === title);
  if (Note) {
    console.log(chalk.white.inverse(Note.title));
    console.log(chalk.white(Note.body));
  } else {
    console.log(chalk.red.inverse("Note not found"));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    return data;
  } catch (e) {
    return [];
  }
};

const saveNote = (notes) => {
  try {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNotes: addNotes,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNote: readNote,
};
