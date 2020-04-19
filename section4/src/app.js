const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();

// console.log(__dirname);
// console.log(path.join(__dirname, '../public/'));

//Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to sever
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

app.get("/weather", (req, res) => {
  res.send({
    forecast: "12 F",
    location: "Ahmednagar",
  });
});
app.get("/help/*", (req, res) => {
  res.render("error", {
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    message: "My 404 page",
  });
});

app.listen(3000, () => {
  console.log("Server is running o port 3000");
});
