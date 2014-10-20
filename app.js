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
  }).spread(function(author, created) {
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

// db.Author.create({name: "Tim"});

// db.Author.all().done(function (err, authors){
//   authors.forEach(function (writer) {
//     var data = writer.dataValues;
//     var name = data.name;
//     var id = data.id;
//     console.log("one author: " + name + ", with id=" + id);
//   });
// });

// db.Author.find(2).done(function (err, author) {
//   author.destroy();
// });

// var post = db.Post.create({title: "First post", content: "Hello, World"});

// db.Author.find(1).done(function (err, writer) {
//   db.Post.find(1).done(function (err, blog) {
//     writer.addPost(blog);
//   });
// });

// db.Author.find(1).done(function (err, tim) {
//   db.Post.find(2).done(function (err, post) {
//     tim.addPost(post);
//   });
// });

// db.Author.find(1).done(function (err, writer) {
//   writer.getPosts().done(function (err, allPosts) {
//     console.log(writer.name + " has " + allPosts.length + " posts:");
//     allPosts.forEach(function (blog) {
//       console.log("  " + blog.dataValues.title + ": " + blog.dataValues.content);
//     });
//   });
// });
