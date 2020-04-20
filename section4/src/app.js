const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geoCode = require("./util/geocode");
const forecast = require("./util/forecast");

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
  if (!req.query.address) {
    return res.send({
      Error: "please provide address",
    });
  }

  const address = req.query.address;
  geoCode(address, (error, data) => {
    if (error) {
      return res.send({
        Error: "error",
      });
    } else {
      const { place_name } = data;
      forecast(data.center[1] = 0, data.center[0] = 0, (error, data) => {
        if (error) {
          return res.send({
            Error: "error",
          });
        } else {
          const { temperature, feelslike, weather_descriptions } = data;
          res.send({
            forecast: `${temperature} F`,
            location: place_name,
            address: address,
          });
        }
      });
    }
  });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "you have error",
    });
  } else {
    res.send({
      products: [],
    });
  }
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
