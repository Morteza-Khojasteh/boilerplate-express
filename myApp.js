const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");

console.log("Hello World");

// Hello Express
// app.get("/", (req, res) => {
//   res.json("Hello Express");
// });

// Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Implement a Root-Level Request Logger Middleware
app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// Chain Middleware to Create a Time Server
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

// Serve Static Assets
const absolutePath = __dirname + "/public";
app.use("/public", express.static(absolutePath));

// Serve an HTML File
app.get("/", (req, res) => {
  const absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

//Serve JSON on a Specific Route
app.get("/json", (req, res) => {
  let message = "Hello json";
  // Use the .env File
  process.env.MESSAGE_STYLE === "uppercase"
    ? res.json({ message: message.toLocaleUpperCase() })
    : res.json({ message: message });
});

// Get Query Parameter Input from the Client
app.get("/name", (req, res) => {
  let query = `${req.query.first} ${req.query.last}`;
  res.json({ name: query });
});

// Get Data from POST Requests
app.post("/name", (req, res) => {
  let body = `${req.body.first} ${req.body.last}`;
  res.json({ name: body });
});

// Get Route Parameter Input from the Client
app.get("/:word/echo", (req, res) => {
  console.log(req.params);
  res.json({ echo: req.params.word });
});

module.exports = app;
