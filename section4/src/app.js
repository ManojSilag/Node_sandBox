const path = require("path");
const express = require("express");
const app = express();

// console.log(__dirname);
// console.log(path.join(__dirname, '../public/'));

const publicDirectoryPath = path.join(__dirname, "../public/");
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "manoj",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    name: "sagar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "pranav",
  });
});


app.set("view engine", "hbs");

app.get("/weather", (req, res) => {
  res.send({
    forecast: "12 F",
    location: "Ahmednagar",
  });
});

app.listen(3000, () => {
  console.log("Server is running o port 3000");
});
