//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const sharp = require('sharp')
const path = require('path');
var _ = require('lodash');
const multer = require('multer');
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogPostDB");
const blogSchema = new mongoose.Schema({
  blogTitle: String,
  blogContent: String,
  profileImg:{
    type:Buffer
  }
});
const Blog = mongoose.model("post", blogSchema);
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  Blog.find({}, function(err, found) {
    if (!err) {
      res.render("home", {
        pageHeading: "Home",
        mainContent: homeStartingContent,
        postContent: found,

      });
    }
  });


});
app.get("/contact", function(req, res) {
  res.render("contact", {
    mainContent: contactContent
  });
});
app.get("/about", function(req, res) {
  res.render("about", {
    mainContent: aboutContent
  });
});
app.get("/compose", function(req, res) {

  res.render("compose");
});
app.post("/compose",upload.single('avatar'), async(req, res)=> {
const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
  var postObject = new Blog({
    blogTitle: req.body.title,
    blogContent: req.body.post,
    profileImg: buffer
  });
  console.log(postObject);
  postObject.save();
  res.redirect("/");
});
app.get("/blog/:id",function(req,res){

    res.set('Content-Type', 'image')
     Blog.findOne({_id:req.params.id},function(err,found){
       console.log(found);
       res.send(found.profileImg);
     });

});

app.get("/posts/:topic", function(req, res) {
  Blog.find({}, function(err, found) {
    if (!err) {
      for (var x = 0; x < found.length; x++) {
        if (_.lowerCase(req.params.topic) === _.lowerCase(found[x].blogTitle)) {
          res.render("post", {
            pageHeading: found[x].blogTitle,
            mainContent: found[x].blogContent
          });
        }
      }
    }
  });

});









app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
