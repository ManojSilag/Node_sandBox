const fs = require("fs");

const getNotes = () => {
  return "Your notes are.......";
};

const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((data) => {
   return data.title === title;
  });

  console.log(duplicateNotes);

  if (duplicateNotes.length === 0) {
    notes.push({ title: title, body: body });
    saveNote(notes);
  } else {
    console.log("Duplicate data");
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
  getNotes: getNotes,
  addNotes: addNotes,
};
