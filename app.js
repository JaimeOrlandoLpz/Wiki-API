//jshint esversion:6

/*
Author: Jaime Orlando
Description: Wikipedia like RESTFUL api
Date of Creation: 28/08/2021
*/

// NPM Packages initialization
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

// Initializing Server
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// Setting ejs as our view engine
app.set('view-engine', 'ejs');

app.use(express.static("public"));

// Creating Connection to Database
mongoose.connect("mongodb://localhost:27017/wikiDB");

// Defining Article Schema and Model for DB
const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

app.get("/", (req, res) => {

})

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
