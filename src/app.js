const express = require("express");
const request = require("request");
const path = require("path");
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const PORT = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
console.log(partialsPath);

// Setupt handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Sy Tran",
  });
});

//
// Goal: Setup two new routes
//
// 1. Setup an about route and render a page title
// 2. Setup a weather route and render a page title
// 3. Test your work by visiting both in the browser

//
// Goal: Update routes
//
// 1. Setup about route to render a title with HTML
// 2. Setup a weather route to send back JSON
//  - Object with forecast and location strings
// 3. Test your work by visiting both in the browser

//
// Goal: Creat two more HTML files
//
// 1. Creat a HTML page for about with "About" title
// 2. Creat a HTML page for help with "Help" title
// 3. Remove the old route handlers for both
// 4. Visit both in browser to test your work

//
// Goal: Create a template for help page
//
// 1. Setup a help template to render a help message to the screen
// 2. Setup the help route and render the template with an example message
// 3. Visit the route in the browser and see your help message print

//
// Goal: Create a partial for the footer
//
// 1. Setup the template for the footer partial "Created by Some name"
// 2. Render the partial at the bottom of all three pages
// 3. Test your work by visitting all three pages

//
// Goal: Create and render a 404 page with handlers
//
// 1. Setup the template to render ther header and footer
// 2. Setup the template to render an error message in a paragraph
// 3. Render the template for both 404 routes
//  - Page not found.
//  - help article not found.
// 4. Test your work. Visit /what and help/units

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is help page",
    title: "Help",
    name: " Sy tran",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Sy Tran",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.json({
      error: "You must provide a search term",
    });
  }

  console.log(req.query);
  return res.json({
    products: [],
  });
});

//
// Goal: update weather endpoint to accept address
//
// 1. No address? Send back an error message
// 2. Address? Send back the static JSON
//  - Add address property onto JSON which returns the provided address
// 3. Test /weather and /weather?address=philadelphia

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.json({
      error: "You must provide an address!",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.json({ error });
    } else {
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.json({ error });
        }
        return res.json({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  });
});

app.get("/help/*splat", (req, res) => {
  res.render("404", {
    errorMessage: "help article not found.",
  });
});

app.get("/*splat", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found.",
  });
});

// app.com
// app.com/help
// app.com/about
app.listen(PORT, () => {
  console.log("server is up on port " + PORT + ".");
});
