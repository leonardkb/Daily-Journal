//jshint esversion:6



const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose= require("mongoose");

//homecontent , about content,contact content

const homeStartingContent = "Welcome to Daily Journel - A Place for Inspiration and IdeasDiscover Your Next Favorite Read on Daily Journal: A Blog for Explorers, Dreamers, and CreativesJoin the Conversation on Daily Journal - Your Daily Dose of InspirationFind Your Spark on Daily Journel - Your Guide to Living Your Best Life Daily Journal - Where Knowledge Meets Passion";
const aboutContent = "Welcome to Daily Journal! Our platform is designed to help you keep track of your thoughts, feelings, and experiences through daily journaling. Whether you're looking to improve your mental well-being, reflect on personal growth, or simply document your day-to-day life, Daily Journal is here to support you. Our user-friendly interface makes it easy to write and organize your entries, while our privacy settings ensure that your journal remains safe and secure. Join our community of passionate writers and start your daily journaling journey today!"
const contactContent="Email: leonardkb9@gmail.com";


//connecting to mongoose

main().catch(err => console.log(err));
 
async function main() {
  await mongoose.connect('mongodb://localhost:27017/blogdb');
  }



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



//creating posts databse


const postschema = {

          title:String,

          content:String


};

//creating Post mongoose model

const Post = new mongoose.model("post",postschema);

let posts=[];

//home route get function
app.get("/", function(req, res){
  Post.find().then(function(posts){
    res.render("home",{
          startingContent:homeStartingContent,
          posts:posts
    });
}).catch(function(err){
console.log(err);
});

});

//about route get function
app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

//contact route get function
app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

//compose route to create blog
app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post =  new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save();

   

   res.redirect("/");

});

//express parameters

app.get("/posts/:postId", function(req, res){
  const requestedTitle = req.params.postId;

    Post.findOne({_id:requestedTitle}).then(function(post){
            res.render("post",{
                  title:post.title,
                  content:post.content

            });
            
    }).catch(function(err){
      console.log(err);
    });

});

//listening to port 3000

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
