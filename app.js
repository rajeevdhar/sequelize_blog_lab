var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models/index.js");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
  res.render("posts/new.ejs");
});

app.get("/posts", function (req, res) {
  db.Post.findAll({include: [db.Author]}).done(function (err, allPosts) {
    res.render("posts/index.ejs", {posts: allPosts});
  });
});

app.post("/posts", function (req, res) {
  var authorParams = req.body.author;
  var postParams = req.body.post;

  db.Author.findOrCreate({
    where: authorParams,
    defaults: authorParams
  }).done(function(err, author, created) {
    db.Post.create(postParams).done(function(err, post) {
      author.addPost(post).done(function (err) {
        res.redirect("/posts");
      });
    });
  });
});

app.get("/authors/:id", function (req, res) {
  var id = req.params.id;
  db.Author.find(id).done(function (err, author) {
    author.getPosts().done(function (err, posts) {
      res.render("authors/show.ejs", {
        author: author,
        posts: posts
      });
    });
  });
});

app.listen(3000);
