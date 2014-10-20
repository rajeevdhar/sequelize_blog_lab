var express = require("express");
var db = require("./models/index.js");

var app = express();

app.get("/", function (req, res) {
  res.render("posts/new.ejs");
});

app.get("/posts", function (req, res) {
  db.Post.findAll().done(function (err, allPosts) {
    res.render("posts/index.ejs", {posts: allPosts});
  });
});

app.post("/posts", function (req, res) {
  res.redirect("/posts");
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
