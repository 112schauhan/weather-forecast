"use strict";
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

const port=process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather Forecast",
    name: "Anil Kumar"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Section",
    contact1: "+91 7042739391",
    contact2:"mourrrya@gmail.com",
    name: "Anil Kumar"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About ME",
    name: "Anil Kumar"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide a location first."
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, place }={}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        });
      }
      res.send({
        forecast: forecastData,
        location: place,
        address: req.query.address
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: 404,
    errorMsg: "help article not found",
    name: "Anil Kumar"
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    errorMsg: "page not found",
    name: "Anil Kumar"
  });
});

app.listen(port, () => {
  console.log("Server is up on port "+port);
});
