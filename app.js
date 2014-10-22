var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models/index.js");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
  res.render("posts/new.ejs");
});

app.get("/posts", function (req, res) {
  db.Post.findAll({include: [db.Author, db.Tag]}).done(function (err, allPosts) {
    res.render("posts/index.ejs", {posts: allPosts});
  });
});

app.post("/posts", function (req, res) {
  var authorParams = req.body.author;
  var postParams = req.body.post;
  var tagParams = req.body.tags;

  var tagArr = tagParams.split(",");

  var createTags = function (post) {
    if (tagArr.length === 0) {
      res.redirect("/posts");
    } else {
      var tagObj = {name: tagArr.pop()};
      db.Tag.findOrCreate({
        where: tagObj,
        defaults: tagObj
      }).done(function (err, tag, created) {
        post.addTag(tag);
        createTags(post);
      });
    }
  };

  var createPost = function(err, author, created) {
    db.Post.create(postParams).done(function(err, post) {
      author.addPost(post).done(function () {
        createTags(post);
      });
    });
  };

  db.Author.findOrCreate({
    where: authorParams,
    defaults: authorParams
  }).done(createPost);
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
