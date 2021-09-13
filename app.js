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

// Check what type of method was called
app.route("/articles")
    .get((req, res) => {
    Article.find((err, foundArticles) => {
        if(!err){
            res.send(foundArticles);// Send Results to Client
        }

    });
})
    .post((req, res)=>{
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save((err)=>{
        if(!err){
            res.send("Glory to Mankind");
        }

        else{
            res.send("Glory to the Machine Lifeforms");
        }
    });
})
    .delete((req, res) =>{
    Article.deleteMany((err)=>{
        if(!err){
            res.send("This is humanity in its truest form");
        }
    });
});

app.route("/articles/:articleTitle").
    get((req, res)=>{
    const articleTitle = req.params.articleTitle;
    Article.findOne({title: articleTitle}, (err, foundArticle)=>{
        if(foundArticle) {
            res.send(foundArticle);
        }

        else{
            res.send("<h1>No Such Article</h1>");
        }
    })
})
    // PUT IS MEANT TO OVERWRITE THE ENTIRE ELEMENT
    .put((req, res)=>{
        Article.updateOne({title: req.params.articleTitle},
            {$set: {title: req.body.title, content: req.body.content}}, {overwrite: true}, (err)=>{
                if(!err){
                    res.send("Article Updated");
                }
                else{
                    res.send("Something's Wrong Sis");
                }
            })
    })
    // Update only the provided field
    .patch((req, res)=>{
        Article.updateOne({title: req.params.articleTitle},
            {$set: req.body}, (err)=>{
                if(!err){
                    res.send("Article Updated");
                }
                else{
                    res.send("Something's Wrong Sis");
                }
            })
    })
    .delete((req, res)=>{
        const title = req.params.articleTitle;
        Article.deleteOne({title: title}, (err) =>{
            if(!err){
                res.send(`Deleted article with title ${title} `);
            }
        })
    });


app.listen(3000, () => {
    console.log("Server started on port 3000");
});
